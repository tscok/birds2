import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import moment from 'moment';

import { firebase, getUser } from 'app/firebase';

import { cloneDeep, omit, omitBy } from 'app/lodash';

import { isDate, isEmpty } from 'app/utils';

import { ButtonToggle, InputField, ModalContainer, ProjectSuccess, ViewHeader } from 'app/components';

import { projectUpdate, projectReset, projectPrivacy } from 'app/redux/actions';


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
        errorMessage: PropTypes.string.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        isSuccess: PropTypes.bool.isRequired,
        isValid: PropTypes.shape({
            dateEnd: PropTypes.bool.isRequired,
            dateStart: PropTypes.bool.isRequired,
            title: PropTypes.bool.isRequired
        }).isRequired,
        onPrivacy: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        pid: PropTypes.string,
        privacyTypes: PropTypes.array.isRequired,
        user: PropTypes.shape({
            uid: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            photoURL: PropTypes.string
        }).isRequired,
    },

    isValidInput() {
        const { isValid } = this.props;
        return Object.keys(omitBy(isValid, (value) => value)).length === 0;
    },

    handleInputChange(evt) {
        const { name, value } = evt.target;
        const { isValid, data } = this.props;

        if (name === 'title') {
            data.title = value;
            isValid.title = !isEmpty(value);
        } else {
            data[name] = value;
            isValid[name] = isDate(value);
        }

        this.props.onUpdate('data', data);
    },

    handleSubmit(evt) {
        evt.preventDefault();

        const { data } = this.props;

        if (data.dateStart >= data.dateEnd) {
            this.props.onUpdate('errorMessage', ERROR_DATES);
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

    handleModalClose() {
        this.handleReset();
        window.scrollTo(0,0);
    },

    handleToggle() {
        this.props.onPrivacy(this.props.data.isPublic);
    },
    
    renderSuccess() {
        if (!this.props.showSuccess) {
            return null;
        }
        return (
            <ModalContainer onClose={ this.handleModalClose }>
                <ProjectSuccess
                    projectId={ this.props.pid }
                    onClose={ this.handleModalClose } />
            </ModalContainer>
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
        const { isPublic } = this.props.data;
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
                        onBlur={ this.handleInputBlur }
                        onChange={ this.handleInputChange }
                        value={ data.title } />
                </div>
                <div className="form__group">
                    <label>Start Date<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        name="dateStart"
                        onBlur={ this.handleInputBlur }
                        onChange={ this.handleInputChange }
                        value={ data.dateStart } />
                </div>
                <div className="form__group">
                    <label>End Date<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        name="dateEnd"
                        onBlur={ this.handleInputBlur }
                        onChange={ this.handleInputChange }
                        value={ data.dateEnd } />
                </div>
                <div className={ block('privacy') }>
                    <ButtonToggle
                        className={ block('toggle') }
                        isActive={ data.isPublic }
                        options={ this.props.privacyTypes }
                        onClick={ this.handleToggle } />
                    { this.renderPrivacyInfo() }
                </div>
                { this.renderErrorMessage() }
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass } disabled={ !this.isValidInput() }>Create Project</button>
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
        data: state.project.data,
        errorMessage: state.project.errorMessage,
        isSubmitting: state.project.isSubmitting,
        isSuccess: state.project.isSuccess,
        isValid: state.project.isValid,
        pid: state.project.projectId,
        privacyTypes: state.project.types,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (field, value) => dispatch(projectUpdate(field, value)),
        onReset: () => dispatch(projectReset()),
        onPrivacy: (value) => dispatch(projectPrivacy({ isPublic: !value }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
