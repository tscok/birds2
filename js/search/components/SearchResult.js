import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import { List, Spinner } from 'js/core/components';
import SearchResultItem from './SearchResultItem';


const block = purebem.of('search-result');

const SearchResult = React.createClass({

    propTypes: {
        path: PropTypes.string,
        root: PropTypes.string,
        uid: PropTypes.string,
        // redux
        keyword: PropTypes.string,
        result: PropTypes.array,
        searching: PropTypes.bool
    },

    render() {
        const { keyword, result, searching } = this.props;

        if (isNullOrEmpty(keyword.trim()) && !searching) {
            return null;
        }

        const listItemProps = {
            root: this.props.root
        };

        return (
            <div className={ block() }>
                <p className={ block('matches') }>{ result.length } projects matches your search.</p>
                <List
                    item={ SearchResultItem }
                    itemProps={ listItemProps }
                    list={ result } />
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        keyword: component.keyword.value,
        result: component.result,
        searching: component.searching
    };
};

export default connect(mapStateToProps)(SearchResult);
