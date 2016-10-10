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
        loading: PropTypes.bool,
        result: PropTypes.array
    },

    render() {
        const { keyword, loading, result } = this.props;

        if (loading) {
            return (<Spinner />);
        }

        if (isNullOrEmpty(keyword.trim())) {
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
        loading: component.loading,
        result: component.result
    };
};

export default connect(mapStateToProps)(SearchResult);
