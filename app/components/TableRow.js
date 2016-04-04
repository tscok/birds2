import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('table');

const TableRow = React.createClass({

    propTypes: {
        children: PropTypes.node,
        header: PropTypes.bool,
        first: PropTypes.bool,
        last: PropTypes.bool
    },

    getDefaultProps() {
        return {
            children: null,
            header: false,
            first: false,
            last: false
        };
    },

    renderChildren() {
        if (!this.props.children) {
            return null;
        }

        return this.props.children;
    },

    render() {
        const { header, first, last } = this.props;
        const type = header ? 'header' : 'body';

        return (
            <div { ...this.props } className={ block('row', { type, first, last }) }>
                { this.renderChildren() }
            </div>
        );
    }

});

export default TableRow;
