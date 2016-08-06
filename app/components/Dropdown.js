import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'app/utils';
import { InputField } from 'app/components';


const block = purebem.of('dropdown');

const Dropdown = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        options: PropTypes.array.isRequired,
        // ...
        value: PropTypes.string
    },

    renderControl() {
        return (
            <div className={ block('control') }>
                <InputField
                    name={ this.props.name }
                    onChange={ noop }
                    readOnly={ true }
                    value={ this.props.value } />
                <div className={ block('button') }>X</div>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderControl() }
            </div>
        );
    }

});

export default Dropdown;
