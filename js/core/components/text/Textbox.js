import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { Spinner } from 'js/core/components';


const block = purebem.of('textbox');

const Textbox = React.createClass({

    propTypes: {
        large: PropTypes.bool,
        loading: PropTypes.bool,
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
            large: false,
            loading: false,
            placeholder: '',
            stretched: false,
            type: 'text'
        };
    },

    handleChange(evt) {
        this.props.onChange(evt.target.value);
    },

    renderSpinner() {
        if (!this.props.loading) {
            return null;
        }
        return (
            <div className={ block('spinner') }>
                <Spinner type="circle" />
            </div>
        );
    },

    render() {
        const { large, loading, stretched } = this.props;

        return (
            <div className={ block({ large, loading, stretched }) }>
                <input
                    className={ block('input') }
                    name={ this.props.name }
                    onChange={ this.handleChange }
                    placeholder={ this.props.placeholder }
                    type={ this.props.type }
                    value={ this.props.value } />
                { this.renderSpinner() }
            </div>
        );
    }

});

export default Textbox;
