import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { Spinner } from 'src/core/components';

import './Textbox.less';


const block = purebem.of('textbox');

const Textbox = React.createClass({

    propTypes: {
        error: PropTypes.bool,
        large: PropTypes.bool,
        loading: PropTypes.bool,
        maxLength: PropTypes.number,
        name: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        stretched: PropTypes.bool,
        type: PropTypes.oneOf([
            'text', 'password'
        ]),
        valid: PropTypes.bool,
        validate: PropTypes.string,
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            error: false,
            large: false,
            loading: false,
            maxLength: null,
            placeholder: '',
            stretched: false,
            type: 'text',
            valid: false,
            validate: 'text',
            value: ''
        };
    },

    handleChange(evt) {
        const { value } = evt.target;
        const { onChange, validate } = this.props;

        // Input type validation.
        if (validate === 'date' && isNaN(value)) {
            return;
        }

        // Input requirement validation.
        const valid = validate === 'date' && /^[0-9]{8}$/.test(value);

        // Input value validation.
        const error = validate === 'date' && valid && !moment(value, 'YYYYMMDD', true).isValid();

        onChange({ error, valid, value });
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
        const { error, large, loading, maxLength, stretched } = this.props;

        return (
            <div className={ block({ error, large, loading, stretched }) }>
                <input
                    className={ block('input') }
                    maxLength={ maxLength }
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
