import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('button-radio');

const ButtonRadio = React.createClass({

    propTypes: {
        children: PropTypes.node,
        onClick: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired
    },

    renderOption(item, index, arr) {
        const first = index === 0;
        const last = index === arr.length - 1;
        const { active } = item;

        return (
            <div key={ index } className={ block('option', { first, last, active }) } onClick={ () => this.props.onClick(index) }>
                { item.label }
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
                { this.props.children }
            </div>
        );
    }
});

export default ButtonRadio;
