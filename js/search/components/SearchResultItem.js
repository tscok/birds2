import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import SearchResultButton from './SearchResultButton';


const block = purebem.of('search-result-item');

const SearchResultItem = React.createClass({

    propTypes: {
        first: PropTypes.bool.isRequired,
        item: PropTypes.object.isRequired,
        last: PropTypes.bool.isRequired,
        // ...
        root: PropTypes.string
    },

    getDate(timestamp) {
        return moment.unix(timestamp);
    },

    getDateFromNow(timestamp) {
        return this.getDate(timestamp).fromNow();
    },

    renderButton() {
        return (
            <SearchResultButton
                id={ this.props.item.id }
                path="search.button"
                root={ this.props.root } />
        );
    },

    render() {
        const { first, item, last } = this.props;
        const { expire, timestamp } = item.dates;

        const created = this.getDateFromNow(timestamp);
        const due = this.getDateFromNow(expire);

        return (
            <div className={ block({ first, last }) }>
                <div className={ block('description') }>
                    <div className={ block('title') }>{ item.title }</div>
                    <div className={ block('meta') }>Created { created } by { item.owner }. Due { due }.</div>
                </div>
                <div className={ block('button') }>
                    { this.renderButton() }
                </div>
            </div>
        );
    }

});

export default SearchResultItem;
