import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { capitalize } from 'js/utils';


const block = purebem.of('button-toggle');

const ButtonToggle = React.createClass({

    propTypes: {
        active: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        // ...
        center: PropTypes.bool,
        className: PropTypes.string
    },

    getDefaultProps() {
        return {
            center: false,
            className: null
        };
    },

    onKeyDown(option) {
        return (evt) => {
            switch (evt.which) {
                case 13: // enter
                case 32: // space
                    evt.preventDefault();
                    this.handleToggle(option);
            }
        }
    },

    handleToggle(option) {
        this.props.onClick(this.props.name, option);
    },

    renderOption(option, index, options) {
        const active = option === this.props.active;
        const first = index === 0;
        const last = index === options.length - 1;

        return (
            <div
                key={ index }
                className={ block('option', { first, last, active }) }
                onClick={ () => this.handleToggle(option) }
                onKeyDown={ this.onKeyDown(option) }
                tabIndex="0">
                { capitalize(option) }
            </div>
        );
    },

    render() {
        const { center, className } = this.props;
        const classNames = purebem.many(
            block({ center }),
            className
        );

        return (
            <div className={ classNames }>
                {
                    [].map.call(this.props.options, this.renderOption)
                }
            </div>
        );
    }
});

export default ButtonToggle;
