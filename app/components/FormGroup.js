import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('form-group');

const FormGroup = React.createClass({

    propTypes: {
        children: PropTypes.node,
        className: PropTypes.string,
        description: PropTypes.string,
        label: PropTypes.string
    },

    getDefaultProps() {
        return {
            className: null,
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
        const { className } = this.props;
        const classNames = purebem.many(
            block(),
            className
        );

        return (
            <div className={ classNames }>
                { this.renderLabel() }
                { this.props.children }
            </div>
        );
    }
});

export default FormGroup;
