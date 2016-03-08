import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('toggle-button');

const ToggleButton = React.createClass({

    propTypes: {
        children: PropTypes.node,
        onClick: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired
    },

    renderOption(item, index, arr) {
        const first = index === 0;
        const last = index === arr.length - 1;
        const active = item.value;

        return (
            <div key={ index } className={ block('option', { first, last, active }) } onClick={ () => this.props.onClick(index) }>
                { item.text }
            </div>
        );
    },

    render() {
        return (
            <div className={ purebem.many(block(), this.props.className) }>
                <div className={ block('options') }>
                    {
                        [].map.call(this.props.options, this.renderOption)
                    }
                </div>
                <div className={ block('description') }>
                    { this.props.children }
                </div>
            </div>
        );
    }
});

export default ToggleButton;
