import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'src/utils';
import { Spinner } from 'src/core/components/layout';

import './Button.less';


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
        inline: PropTypes.bool,
        large: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        stretch: PropTypes.bool,
        submit: PropTypes.bool,
        text: PropTypes.string,
        to: PropTypes.string
    },

    getDefaultProps() {
        return {
            color: 'outlined',
            disabled: false,
            inline: false,
            large: false,
            loading: false,
            onClick: noop,
            stretch: false,
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
        if (!this.props.loading) {
            return this.props.text;
        }

        return (
            <Spinner
                type="circle"
                color={ this.isDarkButton() ? 'light' : 'dark' } />
        );
    },

    render() {
        const { color, disabled, inline, large, loading, stretch, submit } = this.props;

        return (
            <button
                className={ block({ color, inline, large, stretch }) }
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
