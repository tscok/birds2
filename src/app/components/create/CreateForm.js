import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import moment from 'moment';

import {
    Button,
    FormGroup,
    TextboxContainer,
    ToggleContainer
} from 'src/core/components';

import { update } from 'src/redux/components/create/actions';


const block = purebem.of('create-form');

const CreateForm = React.createClass({

    propTypes: {
        root: PropTypes.string.isRequired,
        // redux
        form: PropTypes.object.isRequired,
        isPublic: PropTypes.bool.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        onError: PropTypes.func.isRequired
    },

    isValidDate(date) {
        return moment(date, 'YYYYMMDD', true).isValid();
    },

    handleSubmit(evt) {
        evt.preventDefault();
        const { form } = this.props;

        this.props.onError('');

        if (!form.title.value || !form.startDate.value || !form.endDate.value) {
            this.props.onError('Please fill out all fields.');
            return;
        }

        if (form.startDate.error || form.endDate.error) {
            this.props.onError('Some date issue.');
            return;
        }

        if (form.startDate.value > form.endDate.value) {
            this.props.onError('End date must occur after start date.')
            return;
        }

        const data = {
            title: form.title.value,
            startDate: form.startDate.value,
            endDate: form.endDate.value,
            created: +new Date(),
            public: form.isPublic
        };

        console.log('CreateForm:', data);
    },

    renderPrivacyToggle() {
        const description = this.props.isPublic
            ? 'Other users can find, and may join, this project.'
            : 'Other users cannot find, nor join, this project.';

        return (
            <FormGroup
                description={ description }
                inline={ true }
                label="Public project">
                <ToggleContainer
                    path="form.isPublic"
                    root={ this.props.root } />
            </FormGroup>
        );
    },

    renderErrorMessage() {
        if (this.props.form.error === '') {
            return null;
        }

        return (
            <div className={ block('error') }>
                { this.props.form.error }
            </div>
        );
    },

    render() {
        return (
            <form className={ block() } onSubmit={ this.handleSubmit }>
                <FormGroup
                    description="Ex. 'Ringing at the delta'"
                    label="Project name">
                    <TextboxContainer
                        path="form.title"
                        root={ this.props.root }
                        stretched={ true } />
                </FormGroup>
                <div className={ block('columns') }>
                    <div className={ block('column') }>
                        <FormGroup
                            description="YYYYMMDD"
                            label="Start date">
                            <TextboxContainer
                                maxLength={ 8 }
                                path="form.startDate"
                                root={ this.props.root }
                                stretched={ true }
                                validate="date" />
                        </FormGroup>
                    </div>
                    <div className={ block('column') }>
                        <FormGroup
                            description="YYYYMMDD"
                            label="End date">
                            <TextboxContainer
                                maxLength={ 8 }
                                path="form.endDate"
                                root={ this.props.root }
                                stretched={ true }
                                validate="date" />
                        </FormGroup>
                    </div>
                </div>
                { this.renderPrivacyToggle() }
                { this.renderErrorMessage() }
                <div className={ block('buttons') }>
                    <Button
                        color="green"
                        inline={ true }
                        submit={ true }
                        text="Save" />
                    <Button
                        inline={ true }
                        text="Reset" />
                </div>
            </form>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];

    return {
        form: component.form,
        isPublic: component.form.isPublic,
        isSubmitting: component.form.isSubmitting
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onError: (message) => dispatch(update({ root: props.root, path: 'form.error', value: message }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
