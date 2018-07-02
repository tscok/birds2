import React, { PropTypes } from 'react';
import purebem from 'purebem';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

import { Attach } from 'src/core/components';
import { initialize } from 'src/redux/components/search/actions';


const block = purebem.of('search-view');

const SearchView = React.createClass({

    propTypes: {
        auth: PropTypes.object.isRequired,
        root: PropTypes.string.isRequired
    },

    render() {
        return (
            <div className={ block() }>
                <div className={ block('header') }>
                    <h1>Search &amp; Join</h1>
                    <p className={ block('description') }>Search for public projects created by other users.</p>
                    <div className={ block('form') }>
                        <SearchForm
                            path="keyword"
                            root={ this.props.root }
                            uid={ this.props.auth.uid } />
                    </div>
                </div>
                <div className={ block('body') }>
                    <SearchResult
                        path="result"
                        root={ this.props.root }
                        uid={ this.props.auth.uid } />
                </div>
            </div>
        );
    }

});

export default Attach(SearchView, { initialize, root: 'search' });
