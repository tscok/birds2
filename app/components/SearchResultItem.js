import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { JoinButton } from 'app/components';


const block = purebem.of('search-result-item');

const SearchResultItem = React.createClass({

    propTypes: {
        index: PropTypes.number.isRequired,
        item: PropTypes.object.isRequired
    },

    componentDidMount() {
        console.log('SearchResultItem did mount', this.props.index, this.props.item.title);
    },

    componentDidUpdate() {
        console.log('SearchResultItem did update', this.props.index, this.props.item.title);
    },

    render() {
        const { item } = this.props;

        return (
            <div className={ block() }>
                <span className={ block('title') }>{ item.title }</span>
                <span className={ block('owner') }>{ item.uname }</span>
                <span className={ block('start') }>{ item.dateStart }</span>
                <span className={ block('end') }>{ item.dateEnd }</span>
                <JoinButton { ...this.props } />
            </div>
        );
    }

});

export default SearchResultItem;
