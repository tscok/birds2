import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { debouncer, isString } from 'app/utils';
import { InputField, List, SearchResultItem, ViewHeader } from 'app/components';
import { searchReset, searchUpdate } from 'app/redux/search';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    propTypes: {
        isSearching: PropTypes.bool.isRequired,
        keyword: PropTypes.string.isRequired,
        onReset: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        results: PropTypes.array.isRequired
    },

    componentDidMount() {
        this.projectsRef = firebase.database().ref('projects').orderByChild('type').equalTo('Public');
    },

    componentWillUnmount() {
        this.projectsRef.off('value');
        this.props.onReset();
    },

    getResults() {
        const { keyword } = this.props;
        const projects = [];

        new Promise((resolve, reject) => {
            this.projectsRef.on('child_added', (snap) => {
                const project = snap.val();
                const isMatch = ['title', 'owner'].some((val) => this.isMatch(keyword, project[val]));
                if (isMatch) {
                    projects.push(project);
                }
                resolve(projects);
            });
        }).then(this.setResults);
    },

    setResults(results=[]) {
        this.props.onUpdate({
            isSearching: false,
            results
        });
    },

    isMatch(key, str) {
        const pattern = new RegExp(`${key}`, 'i');
        return pattern.test(str);
    },

    handleInput(evt) {
        let keyword = evt.target.value;
        const isSearching = isString(keyword);

        if (isSearching) {
            debouncer(this.getResults);
        } else {
            this.setResults();
        }
        
        this.props.onUpdate({
            isSearching,
            keyword
        });
    },

    renderResults() {
        const { results } = this.props;

        if (!results.length) {
            return null;
        }
        
        return (
            <List
                list={ results }
                listItem={ SearchResultItem } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="Find Projects">
                    <p>Find public projects by title or username.</p>
                    <InputField
                        iconClass="icon-search"
                        iconClick={ this.handleSearch }
                        isLoading={ this.props.isSearching }
                        onChange={ this.handleInput }
                        placeholder="Project title or username"
                        value={ this.props.keyword } />
                </ViewHeader>
                { this.renderResults() }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        isSearching: state.search.isSearching,
        keyword: state.search.keyword,
        results: state.search.results
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(searchReset()),
        onUpdate: (data) => dispatch(searchUpdate(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
