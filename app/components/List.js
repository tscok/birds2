import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('list');

const List = React.createClass({

    propTypes: {
        list: PropTypes.array.isRequired,
        listItem: PropTypes.any.isRequired,
        // ...
        listItemProps: PropTypes.object
    },

    renderListItem(item, index) {
        return (
            <this.props.listItem { ...this.props } { ...this.props.listItemProps }
                key={ index }
                item={ item }
                index={ index } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                {
                    [].map.call(this.props.list, this.renderListItem)
                }
            </div>
        );
    }

});

export default List;
