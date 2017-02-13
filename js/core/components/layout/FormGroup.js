import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';


const block = purebem.of('form-group');

const FormGroup = React.createClass({

    propTypes: {
        children: PropTypes.node,
        description: PropTypes.string,
        inline: PropTypes.bool,
        label: PropTypes.string
    },

    getDefaultProps() {
        return {
            children: null,
            description: '',
            inline: false,
            label: '&nbsp;'
        };
    },

    renderDescription() {
        if (isNullOrEmpty(this.props.description)) {
            return null;
        }

        return (
            <div className={ block('description') }>
                { this.props.description }
            </div>
        );
    },

    renderLabel() {
        if (isNullOrEmpty(this.props.label)) {
            return null;
        }

        return (
            <label className={ block('label') }>
                { this.props.label }
                { this.renderDescription() }
            </label>
        );
    },

    render() {
        const { inline } = this.props;

        return (
            <div className={ block({ inline }) }>
                { this.renderLabel() }
                { this.props.children }
            </div>
        );
    }
});

export default FormGroup;
