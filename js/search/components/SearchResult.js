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

    renderResult() {
        const { result, searching } = this.props;
        const listItemProps = {
            root: this.props.root
        };

        if (!result.length && !searching) {
            return (<p className={ block('empty') }>No projects match your search :(</p>);
        }

        return (
            <List
                item={ SearchResultItem }
                itemProps={ listItemProps }
                list={ result } />
        );
    },

    render() {
        const { keyword } = this.props;

        if (isNullOrEmpty(keyword.trim())) {
            return null;
        }

        return (
            <div className={ block() }>
                { this.renderResult() }
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
