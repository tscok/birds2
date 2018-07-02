import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { List, Spinner } from 'src/core/components';
import SearchResultItem from './SearchResultItem';


const block = purebem.of('search-result');

const SearchResult = React.createClass({

    propTypes: {
        path: PropTypes.string,
        root: PropTypes.string,
        uid: PropTypes.string,      // get from mapStateToProps?
        // redux
        keyword: PropTypes.string,
        result: PropTypes.array,
        searching: PropTypes.bool
    },

    getDefaultProps() {
        return {
            keyword: '',
            result: [],
            searching: false
        };
    },

    renderResult() {
        const { result, searching } = this.props;
        const listItemProps = {
            root: this.props.root,
            uid: this.props.uid
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
        if (this.props.keyword.trim() === '') {
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
