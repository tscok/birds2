import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('textbox');

const Textbox = React.createClass({

    propTypes: {
        name: PropTypes.string,
        onChange: PropTypes.func,
        type: PropTypes.oneOf(['text', 'password']),
        value: PropTypes.string
    },

    handleChange(evt) {
        this.props.onChange(evt.target.value);
    },

    render() {
        return (
            <input
                className={ block() }
                name={ this.props.name }
                type={ this.props.type }
                value={ this.props.value }
                onChange={ this.handleChange } />
        );
    }

});

export default Textbox;
