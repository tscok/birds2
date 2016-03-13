import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('button-switch');

const ButtonSwitch = React.createClass({

    propTypes: {
        isActive: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        // ...
        className: PropTypes.string
    },

    getDefaultProps() {
        return {
            className: ''
        };
    },

    onKeyDown(evt) {
        switch (evt.which) {
            case 13:
            case 32:
                this.props.onClick();
        }
    },

    renderOption(option, index) {
        const first = index === 0;
        const last = index !== 0;

        return (
            <div key={ index } className={ block('option', { first, last }) }>{ option }</div>
        );
    },

    render() {
        const active = this.props.isActive;

        return (
            <div className={ purebem.many(block(), this.props.className) } tabIndex="0" onClick={ this.props.onClick } onKeyDown={ this.onKeyDown }>
                <div className={ block('lever', { active }) } />
                <div className={ block('options') }>
                    {
                        [].map.call(this.props.options, this.renderOption)
                    }
                </div>
            </div>
        );
    }
});

export default ButtonSwitch;
