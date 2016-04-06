import React from 'react';
import purebem from 'purebem';
import promise from 'promise';

import {
    delayAction,
    getStatus,
    isEmpty
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
        this.projectsRef = firebaseRef.child('projects').orderByChild('public').equalTo(true);
        this.sitesRef = firebaseRef.child('sites');
        this.results = [];
    },

    getMatch(project) {
        const pattern = new RegExp(this.state.needle, 'i');
        const sample = project['title'];
        return sample.length && pattern.test(sample);
    },

    handleSearch() {
        if (isEmpty(this.state.needle)) {
            return [];
        }

        this.projectsRef.once('value', (snap) => {
            snap.forEach((child) => {
                const project = child.val();

                if (this.getMatch(project)) {
                    this.results.push(project);
                }
            });

            this.setState({ results: this.results, isLoading: false });
            this.results.length = 0;
        });
    },

    handleChange(evt) {
        const { value } = evt.target;
        this.setState({ needle: value, isLoading: !isEmpty(value) });

        delayAction(() => {
            this.handleSearch();
        });
    },

    renderResult(result, index, results) {
        // if (!result) {
        //     return null;
        // }

        const first = index === 0;
        const last = results.length - 1 === index;

        return (
            <TableRow key={ index } first={ first } last={ last }>
                <TableCol name="avatar">
                    <Avatar
                        name={ result.title }
                        status={ getStatus(result.start, result.end) } />
                </TableCol>
                <TableCol name="title" value={ result.title } />
                <TableCol name="status" value={ getStatus(result.start, result.end) } />
                <TableCol name="join">
                    <button type="button" className={ block('button') }>Join</button>
                </TableCol>
            </TableRow>
        );
    },

    renderResults() {
        if (!this.state.results.length && isEmpty(this.state.needle)) {
            return null;
        }

        return (
            <div className="container">
                <TableRow header={ true }>
                    <TableCol header={ true } name="avatar" value="Avatar" />
                    <TableCol header={ true } name="title" value="Title" />
                    <TableCol header={ true } name="status" value="Status" />
                    <TableCol header={ true } name="join" value="Join" />
                </TableRow>
                {
                    [].map.call(this.state.results, this.renderResult)
                }
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="Find &amp; Join">
                    <p>Here you can search for existing projects to join.</p>
                    <InputField
                        autoFocus={ true }
                        iconClass="icon-search"
                        iconClick={ this.handleSearch }
                        isLoading={ this.state.isLoading }
                        onChange={ this.handleChange }
                        value={ this.state.needle } />
                </ViewHeader>
                { this.renderResults() }
            </div>
        );
    }

});

export default SearchView;
