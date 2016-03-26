import React, { PropTypes } from 'react';
import purebem from 'purebem';

import noop from 'app/noop';


const block = purebem.of('input-field');

const InputField = React.createClass({

    propTypes: {
        onChange: PropTypes.func.isRequired,
        // ...
        error: PropTypes.string,
        iconClass: PropTypes.string,
        iconClick: PropTypes.func,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            error: '',
            iconClass: '',
            iconClick: noop,
            placeholder: '',
            type: 'text',
            value: ''
        };
    },

    renderIcon() {
        const { iconClass, iconClick } = this.props;

        return (
            <i className={ purebem.many(block('icon'), iconClass) } onClick={ iconClick } />
        );
    },

    renderInput() {
        const { error, iconClass } = this.props;

        const inputClass = purebem.many(
            block('input', { icon: !!iconClass }),
            !!error ? 'error' : ''
        );

        return (
            <input { ...this.props }
                autoComplete="off"
                className={ inputClass }
                name={ this.props.name }
                onChange={ this.props.onChange }
                placeholder={ this.props.placeholder }
                type={ this.props.type } />
        );
    },

    renderError() {
        if (!this.props.error) {
            return null;
        }

        return (
            <div className={ block('error') }>{ this.props.error }</div>
        );
    },

    renderWithIcon() {
        return (
            <div className={ block() }>
                { this.renderInput() }
                { this.renderIcon() }
                { this.renderError() }
            </div>
        );
    },

    renderWithoutIcon() {
        return (
            <div className={ block() }>
                { this.renderInput() }
                { this.renderError() }
            </div>
        );
    },

    render() {
        return this.props.iconClass === ''
            ? this.renderWithoutIcon()
            : this.renderWithIcon();
    }

});

export default InputField;
