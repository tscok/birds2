import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'app/utils';
import { Spinner } from 'app/components';


const block = purebem.of('input-field');

const InputField = React.createClass({

    propTypes: {
        onChange: PropTypes.func.isRequired,
        // ...
        disabled: PropTypes.bool,
        error: PropTypes.string,
        iconClass: PropTypes.string,
        iconClick: PropTypes.func,
        isLoading: PropTypes.bool,
        placeholder: PropTypes.string,
        stretched: PropTypes.bool,
        type: PropTypes.string,
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            disabled: false,
            error: '',
            iconClass: '',
            iconClick: noop,
            isLoading: false,
            placeholder: '',
            stretched: false,
            type: 'text',
            value: ''
        };
    },

    renderLoading() {
        if (!this.props.isLoading) {
            return null;
        }

        return (
            <div className={ block('spinner') }>
                <Spinner type="circle" />
            </div>
        );
    },

    renderIcon() {
        if (this.props.isLoading) {
            return null;
        }

        const { iconClass, iconClick } = this.props;

        return (
            <i className={ purebem.many(block('icon'), iconClass) } onClick={ iconClick } />
        );
    },

    renderInput() {
        const { disabled, error, iconClass, stretched } = this.props;

        const classNames = purebem.many(
            block('input',
            {
                disabled,
                icon: !!iconClass,
                stretched
            }),
            !!error ? 'error' : ''
        );

        return (
            <input { ...this.props }
                autoComplete="off"
                className={ classNames }
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
                { this.renderLoading() }
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
