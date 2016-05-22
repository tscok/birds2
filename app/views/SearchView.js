import React from 'react';
import purebem from 'purebem';
import promise from 'promise';
import moment from 'moment';

import { filter } from 'app/lodash';

import {
    debouncer,
    firebaseRef,
    getStatus,
    isEmpty
} from 'app/utils';

import {
    InputField,
    List,
    SearchResultItem,
    ViewHeader
} from 'app/components';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    getInitialState() {
        return {
            isLoading: false,
            needle: '',
            projects: {},
            results: []
        };
    },

    componentDidMount() {
        this.projectsRef = firebaseRef.child('projects').orderByChild('isPublic').equalTo(true);

        this.projectsRef.on('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.setState({ projects: {}, isLoading: false });
                return;
            }
            this.setState({ projects: snap.val(), isLoading: false });
        });
    },

    componentWillUnmount() {
        this.projectsRef.off('value');
    },

    handleInput(evt) {
        const needle = evt.target.value;
        this.setState({ needle, isLoading: !isEmpty(needle) });
        debouncer(this.handleFiltering);
    },

    handleFiltering() {
        if (this.state.needle === '') {
            this.setState({ results: [] });
            return;
        }

        const { needle, projects } = this.state;
        const pattern = new RegExp(needle, 'i');
        const results = filter(projects, (project) => {
            return pattern.test(project.title) || pattern.test(project.uname);
        });
        this.setState({ results, isLoading: false });
    },

    renderResults() {
        if (this.state.results.length === 0) {
            return null;
        }
        return (
            <List
                list={ this.state.results }
                item={ SearchResultItem } />
        );
    },

    render() {
        const { projects } = this.state;

        return (
            <div className={ block() }>
                <div className="container">
                    <ViewHeader title="Find Projects">
                        <p>Find public projects by title or username.</p>
                        <InputField
                            iconClass="icon-search"
                            iconClick={ this.handleSearch }
                            isLoading={ this.state.isLoading }
                            onChange={ this.handleInput }
                            placeholder="Project title or username"
                            value={ this.state.needle } />
                    </ViewHeader>
                    { this.renderResults() }
                </div>
            </div>
        );
    }

});

export default SearchView;
