import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import moment from 'moment';

import { firebase, getUser } from 'app/firebase';

import { cloneDeep, omit, omitBy } from 'app/lodash';

import { isDate, isEmpty, isString } from 'app/utils';

import { ButtonToggle, InputField, Overlay, ProjectSuccess, ViewHeader } from 'app/components';

import { projectErrors, projectReset, projectUpdate, projectValidation } from 'app/redux/create';


const ERROR_DATES = 'Please make sure dates are in order.';
const ERROR_WRITE = 'Sorry! The project could not be created.'

const INFO_PUBLIC = 'Public projects aim at collaboration. Users can find, and may request to join, your project.';
const INFO_PRIVATE = 'Private projects aim at privacy. Users can not find, nor request to join, your project.';

const block = purebem.of('create-view');

const CreateView = React.createClass({

    propTypes: {
        data: PropTypes.shape({
            dateEnd: PropTypes.string,
            dateStart: PropTypes.string,
            isPublic: PropTypes.bool,
            title: PropTypes.string
        }).isRequired,
        error: PropTypes.shape({
            dateEnd: PropTypes.bool.isRequired,
            dateStart: PropTypes.bool.isRequired,
            title: PropTypes.bool.isRequired
        }).isRequired,
        errorMessage: PropTypes.string.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        isSuccess: PropTypes.bool.isRequired,
        onError: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        privacyTypes: PropTypes.array.isRequired,
        user: PropTypes.shape({
            uid: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            photoURL: PropTypes.string
        }).isRequired,
        validated: PropTypes.shape({
            dateEnd: PropTypes.bool.isRequired,
            dateStart: PropTypes.bool.isRequired,
            title: PropTypes.bool.isRequired
        }).isRequired,
        // ...
        pid: PropTypes.string
    },

    isFormInvalid() {
        const { validated } = this.props;
        const invalidated = omitBy(validated, (valid) => valid);
        return Object.keys(invalidated).length !== 0;
    },

    handleInput(evt) {
        const { name, value } = evt.target;
        const isValid = name === 'title' ? isString(value) : isDate(value);
        this.props.onInput(name, value);
        this.props.onValidation(name, isValid);
    },

    handleSubmit(evt) {
        evt.preventDefault();

        const { data } = this.props;

        if (data.dateStart >= data.dateEnd) {
            console.log('display date error message…');
            // this.props.onUpdate('errorMessage', ERROR_DATES);
            return;
        }

        console.log('handleSubmit', data);

        // const projectRef = firebase.database().child('projects').push();

        // project.pid = projectRef.key();
        // project.uid = this.userData.uid;
        // project.uname = this.userData.uname;

        // projectRef.set(project).then(() => {
        //     const { pid } = project;
        //     const { uid } = this.userData;

        //     project.role = 'owner';

        //     firebase.database().child(`members/${pid}/${uid}`).set(this.userData);
        //     firebase.database().child(`users/${uid}/projects/${pid}`).set(project);

        //     this.setState({ showSuccess: true, projectId: pid });
        // },
        // (error) => {
        //     this.props.onUpdate('errorMessage', error.message);
        // });
    },

    handleReset() {
        this.form.reset();
        this.props.onReset();
    },

    handleOverlayClose() {
        this.handleReset();
        window.scrollTo(0,0);
    },

    handleToggle(type) {
        this.props.onToggle(type);
    },
    
    renderSuccess() {
        if (!this.props.showSuccess) {
            return null;
        }
        return (
            <Overlay onClose={ this.handleOverlayClose }>
                <ProjectSuccess
                    projectId={ this.props.pid }
                    onClose={ this.handleOverlayClose } />
            </Overlay>
        );
    },

    renderErrorMessage() {
        if (this.props.errorMessage === '') {
            return null;
        }
        return (
            <p className={ block('body', ['error']) }>{ this.props.errorMessage }</p>
        );
    },

    renderPrivacyInfo() {
        const isPublic = this.props.data.type === 'Public';
        return (
            <p className={ block('body') }>{ isPublic ? INFO_PUBLIC : INFO_PRIVATE }</p>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { data } = this.props;

        return (
            <form className={ block('form') } onSubmit={ this.handleSubmit } ref={ (form) => this.form = form }>
                <div className="form__group">
                    <label>Project Name</label>
                    <InputField
                        name="title"
                        onChange={ this.handleInput }
                        value={ data.title } />
                </div>
                <div className="form__group">
                    <label>Start Date<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        maxLength="8"
                        name="dateStart"
                        onChange={ this.handleInput }
                        value={ data.dateStart } />
                </div>
                <div className="form__group">
                    <label>End Date<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        maxLength="8"
                        name="dateEnd"
                        onChange={ this.handleInput }
                        value={ data.dateEnd } />
                </div>
                <div className={ block('privacy') }>
                    <ButtonToggle
                        active={ data.type }
                        className={ block('toggle') }
                        options={ this.props.privacyTypes }
                        onClick={ this.handleToggle } />
                    { this.renderPrivacyInfo() }
                </div>
                { this.renderErrorMessage() }
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass } disabled={ this.isFormInvalid() }>Create Project</button>
                    <button type="button" className={ block('button', ['reset']) } onClick={ this.handleReset }>Reset</button>
                </div>
            </form>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ViewHeader title="Create Project" />
                    { this.renderForm() }
                </div>
                { this.renderSuccess() }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        data: state.create.data,
        error: state.create.error,
        errorMessage: state.create.errorMessage,
        isSubmitting: state.create.isSubmitting,
        isSuccess: state.create.isSuccess,
        pid: state.create.projectId,
        privacyTypes: state.create.types,
        user: state.user,
        validated: state.create.validated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onError: (field, value) => dispatch(projectErrors({ [field]: value })),
        onInput: (field, value) => dispatch(projectUpdate({ [field]: value })),
        onReset: () => dispatch(projectReset()),
        onToggle: (type) => dispatch(projectUpdate({ type })),
        onValidation: (field, value) => dispatch(projectValidation({ [field]: value }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
