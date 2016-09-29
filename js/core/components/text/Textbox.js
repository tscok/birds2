import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('textbox');

const Textbox = React.createClass({

    propTypes: {
        name: PropTypes.string,
        onChange: PropTypes.func,
        stretched: PropTypes.bool,
        type: PropTypes.oneOf([
            'text', 'password'
        ]),
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            stretched: false,
            type: 'text'
        };
    },

    handleChange(evt) {
        this.props.onChange(evt.target.value);
    },

    render() {
        const { stretched } = this.props;

        return (
            <input
                className={ block({ stretched }) }
                name={ this.props.name }
                type={ this.props.type }
                value={ this.props.value }
                onChange={ this.handleChange } />
        );
    }

});

export default Textbox;
