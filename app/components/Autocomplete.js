import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { InputField } from 'app/components';


const block = purebem.of('autocomplete');

const Autocomplete = React.createClass({

    propTypes: {
        onChange: PropTypes.func.isRequired,
        // ...
        name: PropTypes.string,
        results: PropTypes.array,
        value: PropTypes.string
    },

    onKeyDown(evt) {
        switch (evt.which) {
            case 13: // enter
                evt.stopPropagation();
                evt.preventDefault();
                break;

            case 38: // up
                evt.stopPropagation();
                evt.preventDefault();
                break;

            case 40: // down
                evt.stopPropagation();
                evt.preventDefault();
                break;
        }
    },

    renderResult(result, index) {
        return (
            <div className={ block('result') } key={ index }>
                { result.size }
            </div>
        );
    },

    renderResults() {
        const { results } = this.props;
        console.log(results);

        if (!results.length) {
            return null;
        }

        return (
            <div className={ block('results') }>
                {
                    [].map.call(results, this.renderResult)
                }
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <InputField
                    name={ this.props.name }
                    onChange={ this.props.onChange }
                    onKeyDown={ this.onKeyDown }
                    value={ this.props.value } />
                { this.renderResults() }
            </div>
        );
    }

});

export default Autocomplete;
