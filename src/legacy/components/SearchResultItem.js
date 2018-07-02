import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { JoinButton, ListItem } from 'app/components';


const block = purebem.of('search-result-item');

const SearchResultItem = React.createClass({

    propTypes: {
        item: PropTypes.object.isRequired
    },

    renderBody() {
        const { item } = this.props;
        const day = moment.unix(item.dates.timestamp);
        const date = day.format('MMMM Do, YYYY');
        return (
            <div>Created by <strong>{ item.owner }</strong> on { date }</div>
        );
    },

    renderAside() {
        return (<JoinButton projectId={ this.props.item.id } />);
    },

    render() {
        return (
            <ListItem
                title={ this.props.item.title }
                body={ this.renderBody() }
                aside={ this.renderAside() } />
        );
    }

});

export default SearchResultItem;
