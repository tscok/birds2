import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'js/utils';
import { Spinner } from 'js/core/components/layout';


const block = purebem.of('button');

const Button = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        color: PropTypes.oneOf([
            'blue', 'gray', 'green',
            'red', 'white', 'yellow',
            'facebook', 'outlined'
        ]),
        disabled: PropTypes.bool,
        large: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        stretched: PropTypes.bool,
        submit: PropTypes.bool,
        text: PropTypes.string,
        to: PropTypes.string
    },

    getDefaultProps() {
        return {
            color: 'outlined',
            disabled: false,
            large: false,
            loading: false,
            onClick: noop,
            stretched: false,
            submit: false,
            text: 'Button',
            to: ''
        };
    },

    isDarkButton() {
        const dark = ['blue', 'facebook', 'green', 'red'];
        return dark.some(color => color === this.props.color);
    },

    onClick() {
        if (this.props.to !== '') {
            this.context.router.push(this.props.to);
        }
        this.props.onClick();
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

        return this.props.text;
    },

    render() {
        const { color, disabled, large, loading, stretched, submit } = this.props;

        return (
            <button
                className={ block({ color, large, stretched }) }
                disabled={ disabled || loading }
                onClick={ this.onClick }
                onKeyDown={ this.onKeyDown }
                tabIndex="0"
                type={ submit ? 'submit' : 'button' }>
                { this.renderContent() }
            </button>
        );
    }

});

export default Button;
