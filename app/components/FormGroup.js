import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('form-group');

const FormGroup = React.createClass({

    propTypes: {
        children: PropTypes.node,
        description: PropTypes.string,
        label: PropTypes.string
    },

    getDefaultProps() {
        return {
            description: '',
            label: ''
        };
    },

    renderDescription() {
        if (this.props.description === '') {
            return null;
        }
        return (
            <span className={ block('description') }>
                { this.props.description }
            </span>
        );
    },

    renderLabel() {
        if (this.props.label === '') {
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
        return (
            <div className={ block() }>
                { this.renderLabel() }
                { this.props.children }
            </div>
        );
    }
});

export default FormGroup;
