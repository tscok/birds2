import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('table');

const TableCol = React.createClass({

    propTypes: {
        children: PropTypes.node,
        header: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            children: null,
            header: false,
            name: '',
            value: ''
        };
    },

    renderChildren() {
        if (!this.props.children) {
            return null;
        }

        return this.props.children;
    },

    render() {
        const { header, name } = this.props;

        return (
            <div { ...this.props } className={ block('col', { header, name }) }>
                { this.props.value }
                { this.renderChildren() }
            </div>
        );
    }

});

export default TableCol;
