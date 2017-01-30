import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import {
    Button,
    FormGroup,
    TextboxContainer
} from 'js/core/components';


const block = purebem.of('create-form');

const CreateForm = React.createClass({

    propTypes: {
        root: PropTypes.string,
        // redux
        title: PropTypes.string
    },

    getDefaultProps() {
        return {
            title: ''
        };
    },

    handleSubmit() {

    },

    render() {
        return (
            <form className={ block() } onSubmit={ this.handleSubmit }>
                <FormGroup label="Title">
                    <TextboxContainer
                        path="form.title"
                        root={ this.props.root }
                        stretched={ true } />
                </FormGroup>
                <div>Input: { this.props.title }</div>
            </form>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        title: component.form.title.value
    };
};

export default connect(mapStateToProps)(CreateForm);
