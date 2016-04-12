import React from 'react';
import purebem from 'purebem';
import promise from 'promise';
import moment from 'moment';

import filter from 'lodash.filter';
import uniqBy from 'lodash.uniqby';
import forEach from 'lodash.foreach';

import {
    delayAction,
    getStatus,
    isEmpty,
    sortByKey
} from 'app/utils';

import firebaseRef from 'app/firebaseRef';

import Avatar from 'app/components/Avatar';
import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import TableCol from 'app/components/TableCol';
import TableRow from 'app/components/TableRow';
import ViewHeader from 'app/components/ViewHeader';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    getInitialState() {
        return {
            isLoading: false,
            needle: '',
            results: []
        };
    },

    componentWillMount() {
        this.projectsRef = firebaseRef.child('projects').orderByChild('isPublic').equalTo(true);
    },

    getMatch(sample) {
        const pattern = new RegExp(this.state.needle, 'i');
        return pattern.test(sample);
    },

    getList(snap) {
        let arr = [], obj = {};
        snap.forEach(child => {
            obj = child.val();
            obj.status = getStatus(obj.dateStart, obj.dateEnd);
            obj.projectId = child.key();

            if (this.getMatch(obj.title)) {
                arr.push(obj);
            }
            
            if (!!obj.sites) {
                forEach(obj.sites, site => {
                    if (this.getMatch(site.name)) {
                        arr.push(obj);
                    }
                });
            }
        });
        return arr;
    },

    handleSearch() {
        let results = [];

        if (isEmpty(this.state.needle)) {
            this.setState({ results, isLoading: false });
            return;
        }

        const a = moment();
        const projects = new promise((resolve, reject) => {
            this.projectsRef.once('value', (snap) => {
                resolve(this.getList(snap));
            });
        });

        projects.then(list => {
            const b = moment();
            const loadTime = b.diff(a, 'seconds', true);
            results = uniqBy(list, 'projectId');
            sortByKey(results, 'status');
            this.setState({ results, loadTime, isLoading: false });
        });
    },

    handleChange(evt) {
        const needle = evt.target.value;
        this.setState({ needle, isLoading: !isEmpty(needle) });
        delayAction(() => this.handleSearch());
    },

    renderResult(result, index, results) {
        const first = index === 0;
        const last = results.length - 1 === index;

        const button = (<button type="button" className={ block('button') }>Join</button>);

        return (
            <TableRow key={ index } first={ first } last={ last }>
                <TableCol name="avatar">
                    <Avatar
                        name={ result.title }
                        status={ result.status } />
                </TableCol>
                <TableCol name="title" value={ result.title } />
                <TableCol name="owner" value={ result.ownerId } />
                <TableCol name="status" value={ result.status } />
                <TableCol name="join">
                    { result.status !== 'Ended' ? button : null }
                </TableCol>
            </TableRow>
        );
    },

    renderResults() {
        if (this.state.results.length === 0) {
            return null;
        }

        return (
            <ContentBox className={ block('results') }>
                <TableRow header={ true }>
                    <TableCol header={ true } name="avatar" value="Avatar" />
                    <TableCol header={ true } name="title" value="Title" />
                    <TableCol header={ true } name="owner" value="Owner" />
                    <TableCol header={ true } name="status" value="Status" />
                    <TableCol header={ true } name="join" value="Join" />
                </TableRow>
                {
                    [].map.call(this.state.results, this.renderResult)
                }
            </ContentBox>
        );
    },

    renderMeta() {
        const count = this.state.results.length;
        const match = count > 1 ? 'results' : 'result';

        if (count === 0) {
            return null;
        }

        return (
            <div className={ block('info') }>{ count } { match } ({ this.state.loadTime } seconds).</div>
        );
    },

    renderEmpty() {
        if (this.state.results.length || isEmpty(this.state.needle) || this.state.isLoading) {
            return null;
        }

        return (
            <div className={ block('info') }>Nothing matched: <strong>{ this.state.needle }</strong></div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ViewHeader title="Find &amp; Join">
                        <p>Here you can search for projects to join.</p>
                        <InputField
                            autoFocus={ true }
                            iconClass="icon-search"
                            iconClick={ this.handleSearch }
                            isLoading={ this.state.isLoading }
                            onChange={ this.handleChange }
                            placeholder="Project title, site name, etc."
                            value={ this.state.needle } />
                        { this.renderEmpty() }
                        { this.renderMeta() }
                    </ViewHeader>
                    { this.renderResults() }
                </div>
            </div>
        );
    }

});

export default SearchView;
