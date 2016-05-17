import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import {
    cloneDeep,
    omit,
    omitBy
} from 'app/lodash';

import {
    firebaseRef,
    isDate,
    isEmpty
} from 'app/utils';

import {
    ButtonToggle,
    InputField,
    ModalContainer,
    ProjectSuccess,
    ViewHeader
} from 'app/components';


const ERROR_DATES = 'Please make sure dates are in order.';
const ERROR_WRITE = 'Sorry! The project could not be created.'

const INFO_PUBLIC = 'Public projects aim at collaboration. Users can find, and may request to join, your project.';
const INFO_PRIVATE = 'Private projects aim at privacy. Users can not find, nor request to join, your project.';

const initialState = {
    isSubmitting: false,
    isValid: {
        dateEnd: false,
        dateStart: false,
        title: false
    },
    project: {
        dateEnd: '',
        dateStart: '',
        isPublic: true,
        title: ''
    },
    projectId: null,
    showError: null,
    showSuccess: null,
    toggleOptions: ['Public', 'Private']
};

const block = purebem.of('create-view');

const CreateView = React.createClass({

    getInitialState() {
        return cloneDeep(initialState);
    },

    componentDidMount() {
        const authData = firebaseRef.getAuth();
        const provider = authData[authData.provider];

        this.userData = {
            uid: authData.uid,
            uname: provider.displayName,
            avatar: provider.profileImageURL,
            role: 'owner'
        };
    },

    isValidInput() {
        const { isValid } = this.state;
        return Object.keys(omitBy(isValid, (value) => value)).length === 0;
    },

    handleInputChange(evt) {
        const { name, value } = evt.target;
        const { isValid, project } = this.state;

        if (name === 'title') {
            project.title = value;
            isValid.title = !isEmpty(value);
        } else {
            project[name] = value;
            isValid[name] = isDate(value);
        }

        this.setState({ project });
    },

    handleSubmit(evt) {
        evt.preventDefault();

        const { project } = this.state;

        if (project.dateStart >= project.dateEnd) {
            this.setState({ showError: ERROR_DATES });
            return;
        }

        const projectRef = firebaseRef.child('projects').push();

        project.pid = projectRef.key();
        project.uid = this.userData.uid;
        project.uname = this.userData.uname;

        projectRef.set(project).then(() => {
            const { pid } = project;
            const { uid } = this.userData;

            project.role = 'owner';

            firebaseRef.child(`members/${pid}/${uid}`).set(this.userData);
            firebaseRef.child(`users/${uid}/projects/${pid}`).set(project);

            this.setState({ showSuccess: true, projectId: pid });
        },
        (error) => {
            this.setState({ showError: error.message });
        });
    },

    handleReset() {
        this.form.reset();
        this.setState(cloneDeep(initialState));
    },

    handleToggle() {
        const { project } = this.state;
        project.isPublic = !project.isPublic;
        this.setState({ project });
    },

    handleModalClose() {
        this.handleReset();
        window.scrollTo(0,0);
    },
    
    renderSuccess() {
        if (!this.state.showSuccess) {
            return null;
        }
        return (
            <ModalContainer onClose={ this.handleModalClose }>
                <ProjectSuccess
                    projectId={ this.state.projectId }
                    onClose={ this.handleModalClose } />
            </ModalContainer>
        );
    },

    renderErrorMessage() {
        if (!this.state.showError) {
            return null;
        }
        return (
            <p className={ block('body', ['error']) }>{ this.state.showError }</p>
        );
    },

    renderPrivacyInfo() {
        const { isPublic } = this.state.project;
        return (
            <p className={ block('body') }>{ isPublic ? INFO_PUBLIC : INFO_PRIVATE }</p>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { project } = this.state;

        return (
            <form className={ block('form') } onSubmit={ this.handleSubmit } ref={ (form) => this.form = form }>
                <div className="form__group">
                    <label>Project Name</label>
                    <InputField
                        name="title"
                        onBlur={ this.handleInputBlur }
                        onChange={ this.handleInputChange }
                        value={ project.title } />
                </div>
                <div className="form__group">
                    <label>Start Date<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        name="dateStart"
                        onBlur={ this.handleInputBlur }
                        onChange={ this.handleInputChange }
                        value={ project.dateStart } />
                </div>
                <div className="form__group">
                    <label>End Date<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        name="dateEnd"
                        onBlur={ this.handleInputBlur }
                        onChange={ this.handleInputChange }
                        value={ project.dateEnd } />
                </div>
                <div className={ block('privacy') }>
                    <ButtonToggle
                        className={ block('toggle') }
                        isActive={ project.isPublic }
                        options={ this.state.toggleOptions }
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

export default CreateView;
