import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'app/utils';
import { Spinner } from 'app/components';


const block = purebem.of('button');

const Button = React.createClass({

    propTypes: {
        active: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        large: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        stretched: PropTypes.bool,
        style: PropTypes.oneOf([
            'danger',
            'default',
            'facebook',
            'link',
            'neutral',
            'success',
            'warning'
        ]),
        type: PropTypes.string
    },

    getDefaultProps() {
        return {
            active: false,
            disabled: false,
            large: false,
            loading: false,
            onClick: noop,
            stretched: false,
            style: 'default',
            type: 'button'
        };
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
            const color = this.props.style !== 'default' ? 'white' : 'black';
            return (
                <Spinner type="circle" color={ color } />
            );
        }
        return (
            <span>{ this.props.children }</span>
        );
    },

    render() {
        const { active, className, disabled, large, loading, onClick, stretched, style, type } = this.props;
        const isDisabled = disabled || loading;

        const classNames = purebem.many(
            block({
                active,
                disabled: isDisabled,
                large,
                stretched,
                style
            }),
            className
        );

        return (
            <button
                className={ classNames }
                disabled={ isDisabled }
                onClick={ onClick }
                onKeyDown={ this.onKeyDown }
                tabIndex="0"
                type={ type }>
                { this.renderContent() }
            </button>
        );
    }

});

export default Button;
