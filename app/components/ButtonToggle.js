import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('button-toggle');

const ButtonToggle = React.createClass({

    propTypes: {
        isActive: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        // ...
        className: PropTypes.string
    },

    getDefaultProps() {
        return {
            className: null
        };
    },

    onKeyDown(evt) {
        switch (evt.which) {
            case 13: // enter
            case 32: // space
                evt.preventDefault();
                this.props.onClick();
        }
    },

    renderOption(option, index) {
        const type = index === 0 ? 'on' : 'off';
        const state = this.props.isActive ? 'on' : 'off';
        const active = type === state;

        return (
            <div key={ index } className={ block('option', { type, active }) }>{ option }</div>
        );
    },

    render() {
        const active = this.props.isActive;
        const classNames = purebem.many(block({ active }), this.props.className);

        return (
            <div className={ classNames } onClick={ this.props.onClick } onKeyDown={ this.onKeyDown } tabIndex="0">
                <div className={ block('lever') } />
                {
                    [].map.call(this.props.options, this.renderOption)
                }
            </div>
        );
    }
});

export default ButtonToggle;
