import React, { PropTypes } from 'react';
import purebem from 'purebem';

import noop from 'app/noop';


const block = purebem.of('input-field');

const InputField = React.createClass({

    propTypes: {
        onInput: PropTypes.func.isRequired,
        // ...
        iconClass: PropTypes.string,
        iconClick: PropTypes.func,
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            iconClass: '',
            iconClick: noop,
            value: ''
        };
    },

    renderIcon() {
        const { iconClass, iconClick } = this.props;

        if (iconClass === '') {
            return null;
        }

        return (
            <i className={ purebem.many(block('icon'), iconClass) } onClick={ iconClick } />
        );
    },

    render() {
        const { onInput, iconClass, value } = this.props;
        const icon = iconClass !== '';

        return (
            <div className={ block() }>
                <input type="text" className={ block('input', { icon }) } value={ value } onInput={ onInput } />
                { this.renderIcon() }
            </div>
        );
    }

});

export default InputField;
