import React, { PropTypes } from 'react';
import purebem from 'purebem';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/search/actions';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    propTypes: {
        auth: PropTypes.object.isRequired,
        root: PropTypes.string.isRequired
    },

    render() {
        return (
            <div className={ block() }>
                <h1>SearchView</h1>
                <SearchForm
                    path="keyword"
                    root={ this.props.root }
                    uid={ this.props.auth.uid } />
                <SearchResult
                    path="result"
                    root={ this.props.root }
                    uid={ this.props.auth.uid } />
            </div>
        );
    }

});

export default attach(SearchView, { initialize, root: 'search' });
