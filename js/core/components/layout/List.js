import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('list');

const List = React.createClass({

    propTypes: {
        item: PropTypes.any,
        list: PropTypes.array
    },

    renderItem(item, index, list) {
        const first = index === 0;
        const last = index === list.length - 1;
        return (
            <this.props.item
                first={ first }
                index={ index }
                item={ item }
                key={ index }
                last={ last } />
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
