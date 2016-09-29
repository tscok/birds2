import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';


const block = purebem.of('form-group');

const FormGroup = React.createClass({

    propTypes: {
        children: PropTypes.node,
        description: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.oneOf([
            'block',
            'inline'
        ])
    },

    getDefaultProps() {
        return {
            type: 'block'
        };
    },

    renderDescription() {
        if (isNullOrEmpty(this.props.description)) {
            return null;
        }

        return (
            <span className={ block('description') }>
                { this.props.description }
            </span>
        );
    },

    renderLabel() {
        if (isNullOrEmpty(this.props.label)) {
            return null;
        }

        return (
            <label className={ block('label') }>
                { this.props.label }
                { this.renderDescription() }
            </label>
        );
    },

    render() {
        const { type } = this.props;
        return (
            <div className={ block({ type }) }>
                { this.renderLabel() }
                { this.props.children }
            </div>
        );
    }
});

export default FormGroup;
