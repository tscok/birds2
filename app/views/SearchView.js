import React from 'react';
import purebem from 'purebem';
import promise from 'promise';

import filter from 'lodash.filter';
import uniqBy from 'lodash.uniqby';

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
        this.sitesRef = firebaseRef.child('sites').orderByChild('isPublic').equalTo(true);
        this.projects = [],
        this.sites = [];
    },

    getMatch(sample) {
        const pattern = new RegExp(this.state.needle, 'i');
        return pattern.test(sample);
    },

    getList(snap, key) {
        let arr = [], obj = {};
        snap.forEach(child => {
            obj = child.val();
            if (this.getMatch(obj[key])) {
                obj.projectId = obj.projectId || child.key();
                obj.status = getStatus(obj.dateStart, obj.dateEnd);
                arr.push(obj);
            }
        });
        return arr;
    },

    handleSearch() {
        this.projectsRef.once('value', (snap) => {
            this.projects = this.getList(snap, 'title');
            this.setState({ results: this.projects.concat(this.sites), isLoading: false });
        });

        this.sitesRef.once('value', (snap) => {
            this.sites = this.getList(snap, 'name');
            this.setState({ results: this.projects.concat(this.sites), isLoading: false });
        });
    },

    handleChange(evt) {
        const { value } = evt.target;
        this.setState({ needle: value, isLoading: !isEmpty(value) });

        this.projects.length = 0;
        this.sites.length = 0;

        delayAction(() => {
            this.handleSearch();
        });
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
        if (this.state.results.length === 0 || isEmpty(this.state.needle)) {
            return null;
        }

        const results = uniqBy(this.state.results, 'projectId');

        sortByKey(results, 'status');

        return (
            <div className={ block('results') }>
                <TableRow header={ true }>
                    <TableCol header={ true } name="avatar" value="Avatar" />
                    <TableCol header={ true } name="title" value="Title" />
                    <TableCol header={ true } name="owner" value="Owner" />
                    <TableCol header={ true } name="status" value="Status" />
                    <TableCol header={ true } name="join" value="Join" />
                </TableRow>
                {
                    [].map.call(results, this.renderResult)
                }
            </div>
        );
    },

    renderEmpty() {
        if (this.state.results.length || isEmpty(this.state.needle) || this.state.isLoading) {
            return null;
        }

        return (
            <div className={ block('empty') }>
                <p>Nothing matched: <strong>{ this.state.needle }</strong></p>
            </div>
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
                    </ViewHeader>
                    { this.renderResults() }
                </div>
            </div>
        );
    }

});

export default SearchView;
