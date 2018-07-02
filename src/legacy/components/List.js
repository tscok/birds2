import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('list');

const List = React.createClass({

    propTypes: {
        list: PropTypes.array.isRequired,
        listItem: PropTypes.any.isRequired,
        // ...
        listHeader: PropTypes.any,
        listItemProps: PropTypes.object
    },

    renderListHeader() {
        if (!this.props.listHeader) {
            return null;
        }
        return (<this.props.listHeader />);
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
                { this.renderListHeader() }
                {
                    [].map.call(this.props.list, this.renderListItem)
                }
            </div>
        );
    }

});

export default List;
