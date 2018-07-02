import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { InputField } from 'app/components';


const block = purebem.of('input-range');

const InputRange = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        // ...
        max: PropTypes.string,
        min: PropTypes.string
    },

    getDefaultProps() {
        return {
            max: '100',
            min: '0'
        };
    },

    handleInput(evt) {
        const { value } = evt.target;
        if (Number(value) > this.props.max) {
            return;
        }
        this.props.onChange(evt);
    },

    render() {
        return (
            <div className={ block() }>
                <InputField
                    name={ this.props.name }
                    onChange={ this.handleInput }
                    value={ this.props.value } />
                <input
                    max={ this.props.max }
                    min={ this.props.min }
                    name={ this.props.name }
                    onChange={ this.props.onChange }
                    type="range"
                    value={ this.props.value } />
            </div>
        );
    }

});

export default InputRange;
