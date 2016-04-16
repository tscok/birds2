import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { capitalize } from 'app/utils';


const block = purebem.of('table');

const TableCol = React.createClass({

    propTypes: {
        label: PropTypes.string.isRequired,
        // ...
        children: PropTypes.node,
        isFirst: PropTypes.bool,
        isLast: PropTypes.bool,
        status: PropTypes.string,
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            children: null,
            isFirst: false,
            isLast: false,
            status: null,
            value: null
        };
    },

    renderLabel() {
        if (this.props.children) {
            return null;
        }
        return (
            <div className={ block('label') }>{ capitalize(this.props.label) }</div>
        );
    },

    renderValue() {
        if (this.props.children) {
            return null;
        }
        return (
            <div className={ block('value') }>{ capitalize(this.props.value) }</div>
        );
    },

    render() {
        const { label, isFirst, isLast, status } = this.props;

        console.log(status);

        return (
            <div className={ block('col', { label, status, first: isFirst, last: isLast }) }>
                { this.renderLabel() }
                { this.renderValue() }
                { this.props.children }
            </div>
        );
    }

});

export default TableCol;
