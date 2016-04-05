import React from 'react';
import purebem from 'purebem';

import {
    delayAction,
    getStatus
} from 'app/utils';

import firebaseRef from 'app/firebaseRef';

import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import Spinner from 'app/components/Spinner';
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

    getMatch(obj) {
        const pattern = new RegExp(this.state.needle, 'i');
        const sample = obj['title'];

        if (sample.length && pattern.test(sample)) {
            this.results.push(obj);
            // const { results } = this.state;
            // results.push(obj);
            // this.setState({ results, isLoading: false });
        }
    },

    handleSearch() {
        this.projectsRef.once('value', (snap) => {
            snap.forEach((child) => {
                this.getMatch(child.val());
            });

            this.setState({ results: this.results, isLoading: false });

            this.results.length = 0;
        });
    },

    handleChange(evt) {
        const needle = evt.target.value;
        this.setState({ needle });

        if (needle === '') {
            this.setState({ results: [] });
            return;
        }

        delayAction(() => {
            this.setState({ results: [], isLoading: true });
            this.handleSearch()
        });
    },

    renderResult(result, index, results) {
        const first = index === 0;
        const last = results.length - 1 === index;

        return (
            <TableRow key={ index } first={ first } last={ last }>
                <TableCol name="avatar" value="Avatar" />
                <TableCol name="title" value={ result.title } />
                <TableCol name="status" value={ getStatus(result.start, result.end) } />
                <TableCol name="join">
                    <button>Join</button>
                </TableCol>
            </TableRow>
        );
    },

    renderResults() {
        if (!this.state.results.length) {
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

    renderSpinner() {
        if (!this.state.isLoading) {
            return null;
        }

        return (
            <div className={ block('spinner') }>
                <Spinner />
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
                        onChange={ this.handleChange }
                        value={ this.state.needle } />
                </ViewHeader>
                { this.renderSpinner() }
                { this.renderResults() }
            </div>
        );
    }

});

export default SearchView;
