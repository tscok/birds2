import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import {
    cloneDeep,
    omitBy,
    pick
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
        const { project } = this.state;
        const authData = firebaseRef.getAuth();
        const provider = authData[authData.provider];

        this.userData = {
            uid: authData.uid,
            name: provider.displayName,
            avatar: provider.profileImageURL,
            role: 'owner'
        };

        project.ownerId = this.userData.uid;
        project.ownerName = this.userData.name;
        this.setState({ project });
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

        firebaseRef.child('projects').push(project).then((ref) => {
            const pid = ref.key();
            const uid = this.userData.uid;
            const data = pick(project, ['dateEnd', 'dateStart', 'isPublic', 'title']);

            firebaseRef.child(`members/${pid}/member`).push(this.userData);

            firebaseRef.child(`users/${uid}/owner`).push(data);

            this.setState({ showSuccess: true });
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
