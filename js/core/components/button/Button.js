import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'js/utils';
import { Spinner } from 'js/core/components/layout';


const block = purebem.of('button');

const Button = React.createClass({

    propTypes: {
        className: PropTypes.string,
        color: PropTypes.oneOf([
            'blue', 'gray', 'green',
            'red', 'white', 'yellow',
            'facebook'
        ]),
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        stretched: PropTypes.bool,
        submit: PropTypes.bool,
        text: PropTypes.string,
    },

    getDefaultProps() {
        return {
            color: 'blue',
            disabled: false,
            loading: false,
            onClick: noop,
            stretched: false,
            submit: false,
            text: 'Button'
        };
    },

    isDarkButton() {
        const dark = ['blue', 'facebook', 'green', 'red'];
        return dark.some(color => color === this.props.color);
    },

    onKeyDown(evt) {
        switch (evt.which) {
            case 13: // enter
            case 32: // space
                this.props.onClick();
        }
    },

    renderContent() {
        if (this.props.loading) {
            const spinnerColor = this.isDarkButton() ? 'white' : 'black';

            return (
                <Spinner type="circle" color={ spinnerColor } />
            );
        }

        return (
            <span>{ this.props.text }</span>
        );
    },

    render() {
        const { className, color, disabled, loading, stretched, submit } = this.props;
        const classNames = purebem.many(block({ color, stretched }), className);

        return (
            <button
                className={ classNames }
                disabled={ disabled || loading }
                onClick={ this.props.onClick }
                onKeyDown={ this.onKeyDown }
                tabIndex="0"
                type={ submit ? 'submit' : 'button' }>
                { this.renderContent() }
            </button>
        );
    }

});

export default Button;
