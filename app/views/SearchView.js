import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import promise from 'promise';
import moment from 'moment';

import { firebase, getUser } from 'app/firebase';

import { filter } from 'app/lodash';

import { debouncer, getStatus, isEmpty } from 'app/utils';

import { InputField, List, SearchResultItem, ViewHeader } from 'app/components';

import { searchUpdate } from 'app/redux/search';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired,
        isSearching: PropTypes.bool.isRequired,
        keyword: PropTypes.string.isRequired,
        results: PropTypes.array.isRequired
    },

    componentDidMount() {
        this.projectsRef = firebase.database().ref('projects').orderByChild('isPublic').equalTo(true);

        this.projectsRef.on('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.props.onUpdate({ data: {}, isSearching: false });
                return;
            }
            this.props.onUpdate({ data: snap.val(), isSearching: false });
        });
    },

    componentWillUnmount() {
        this.projectsRef.off('value');
    },

    handleInput(evt) {
        const keyword = evt.target.value;
        this.props.onUpdate({ keyword, isSearching: !this.props.isSearching });
        debouncer(this.handleFiltering);
    },

    handleFiltering() {
        if (this.props.keyword === '') {
            this.props.onUpdate({ results: [] });
            return;
        }

        const { keyword, data } = this.props;
        const pattern = new RegExp(keyword, 'i');
        const results = filter(data, (project) => {
            return pattern.test(project.title) || pattern.test(project.uname);
        });
        this.props.onUpdate({ results, isSearching: false });
    },

    renderResults() {
        if (this.props.results.length === 0) {
            return null;
        }
        return (
            <List
                list={ this.props.results }
                item={ SearchResultItem } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
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
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        data: state.search.data,
        isSearching: state.search.isSearching,
        keyword: state.search.keyword,
        results: state.search.results
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (data) => dispatch(searchUpdate(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
