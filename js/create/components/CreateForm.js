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
        form: PropTypes.object
    },

    getDefaultProps() {
        return {
            form: {}
        };
    },

    handleSubmit() {
        // ...
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
                <div className={ block('row') }>
                    <FormGroup
                        description="YYYYMMDD"
                        inline={ true }
                        label="Start date">
                        <TextboxContainer
                            path="form.date.start"
                            root={ this.props.root }
                            stretched={ true } />
                    </FormGroup>
                    <FormGroup
                        description="YYYYMMDD"
                        inline={ true }
                        label="End date">
                        <TextboxContainer
                            path="form.date.end"
                            root={ this.props.root }
                            stretched={ true } />
                    </FormGroup>
                </div>
                <Button
                    color="green"
                    stretched={ true }
                    submit={ true }
                    text="Save" />
                <Button
                    stretched={ true }
                    text="Reset" />
            </form>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        form: component.form
    };
};

export default connect(mapStateToProps)(CreateForm);
