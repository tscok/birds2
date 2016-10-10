import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('textbox');

const Textbox = React.createClass({

    propTypes: {
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        stretched: PropTypes.bool,
        type: PropTypes.oneOf([
            'text', 'password'
        ]),
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            placeholder: '',
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
                onChange={ this.handleChange }
                placeholder={ this.props.placeholder }
                type={ this.props.type }
                value={ this.props.value } />
        );
    }

});

export default Textbox;
