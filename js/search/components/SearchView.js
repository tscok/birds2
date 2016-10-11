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
                <div className={ block('header') }>
                    <h1>SearchView</h1>
                    {/*<p className={ block('info') }>Search for projects by title or name of project owner. Any projects you own will be omitted from results. Clicking the Join button will notify the project's owner of your request. You may Cancel pending requests at any time.</p>*/}
                    <SearchForm
                        path="keyword"
                        root={ this.props.root }
                        uid={ this.props.auth.uid } />
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

export default attach(SearchView, { initialize, root: 'search' });
