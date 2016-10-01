import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('list');

const List = React.createClass({

    propTypes: {
        item: PropTypes.any,
        list: PropTypes.array
    },

    renderItem(item, index) {
        return (
            <this.props.item
                index={ index }
                item={ item }
                key={ index } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                { [].map.call(this.props.list, this.renderItem) }
            </div>
        );
    }
})

export default List;
