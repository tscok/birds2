import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('button-toggle');

const ButtonToggle = React.createClass({

    propTypes: {
        active: PropTypes.string.isRequired,
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

    onKeyDown(option) {
        return (evt) => {
            switch (evt.which) {
                case 13: // enter
                case 32: // space
                    evt.preventDefault();
                    this.props.onClick(option);
            }
        }
    },

    renderOption(option, index, options) {
        const active = option === this.props.active;
        const first = index === 0;
        const last = index === options.length - 1;

        return (
            <div
                key={ index }
                className={ block('option', { first, last, active }) }
                onClick={ () => this.props.onClick(option) }
                onKeyDown={ this.onKeyDown(option) }
                tabIndex="0">
                { option }
            </div>
        );
    },

    render() {
        const classNames = purebem.many(block(), this.props.className);

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
