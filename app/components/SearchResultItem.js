import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { JoinButton } from 'app/components';


const block = purebem.of('search-result-item');

const SearchResultItem = React.createClass({

    propTypes: {
        item: PropTypes.object.isRequired
    },

    render() {
        const { item } = this.props;

        return (
            <div className={ block() }>
                <span className={ block('title') }>{ item.title }</span>
                <span className={ block('owner') }>{ item.uname }</span>
                <span className={ block('start') }>{ item.dateStart }</span>
                <span className={ block('end') }>{ item.dateEnd }</span>
                <JoinButton project={ item } />
            </div>
        );
    }

});

export default SearchResultItem;
