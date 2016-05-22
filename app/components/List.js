import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('list');

const List = React.createClass({

    propTypes: {
        item: PropTypes.any.isRequired,
        list: PropTypes.array.isRequired
    },

    renderItem(item, index) {
        return (
            <this.props.item key={ index } item={ item } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                {
                    [].map.call(this.props.list, this.renderItem)
                }
            </div>
        );
    }

});

export default List;
