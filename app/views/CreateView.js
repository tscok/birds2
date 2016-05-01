import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import {
    assign,
    cloneDeep,
    isNull,
    omitBy
} from 'app/lodash';

import {
    delayAction,
    firebaseRef,
    isDate,
    isEmpty
} from 'app/utils';

import {
    ButtonSwitch,
    ClickOutside,
    ContentBox,
    InputField,
    ModalContainer,
    ProjectSuccess
} from 'app/components';


const ERROR_TITLE = 'Please fill in a title.';
const ERROR_DATE = 'A valid date follows the pattern YYYYMMDD.';
const ERROR_END = 'A project must start before it can end, silly.';

const initialState = {
    end: {},
    errors: {},
    isLocked: true,
    isPublic: true,
    isSubmitting: false,
    projectId: '',
    sites: [],
    showSuccess: false,
    start: {},
    title: {},
    toggleMapLock: ['Unlocked', 'Locked'],
    togglePrivacy: ['Private', 'Public']
};

const form = purebem.of('form');
const block = purebem.of('create-view');

const CreateView = React.createClass({

    componentWillMount() {
        this.setState(cloneDeep(initialState));
        const authData = firebaseRef.getAuth();
        const provider = authData[authData.provider];

        this.owner = {
            id: authData.uid,
            name: provider.displayName,
            avatar: provider.profileImageRul,
            role: 'owner'
        };
    },

    hasErrors(errors) {
        errors = errors || this.state.errors;
        return Object.keys(omitBy(errors, isNull)).length;
    },

    validateAll() {
        let errors = {};

        ['title', 'start', 'end'].map(name => {
            assign(errors, this.validateField(name, this.state[name].value));
        });

        return errors;
    },

    validateField(name, value) {
        const error = {};
        const { start, end } = this.state;

        switch (name) {
            case 'title':
                error[name] = isEmpty(value) ? ERROR_TITLE : null;
                break;
            default:
                error[name] = !isDate(value) ? ERROR_DATE : null;

                if (isDate(start.value) && isDate(end.value)) {
                    error.order = start.value >= end.value ? ERROR_END : null;
                }
        };

        return error;
    },

    handleInputChange(evt) {
        const { name, value } = evt.target;
        const { errors } = cloneDeep(this.state);
        this.setState({ [name]: { value } });

        delayAction(() => {
            this.setState({ errors: assign(errors, this.validateField(name, value)) });
        });
    },

    handleReset() {
        this.form.reset();
        this.setState(cloneDeep(initialState));
    },

    handleSubmit(evt) {
        evt.preventDefault();
        const errors = this.validateAll();

        if (this.hasErrors(errors)) {
            this.setState({ errors });
            return;
        }

        const { title, start, end, sites, isPublic } = this.state;
        const format = 'YYYYMMDD';

        this.project = {
            date: {
                end: moment(end.value, format).unix(),
                start: moment(start.value, format).unix()
            },
            isPublic,
            owner: {
                id: this.owner.id,
                name: this.owner.name
            },
            title: title.value
        };

        console.log(this.getSites());

        // Add project
        this.projectRef = firebaseRef.child('projects').push(this.project, this.onComplete);
    },

    onComplete(error) {
        if (error) {
            console.log('Oh snap! An error occurred…', error);
        } else {
            console.log('success!');
            // Get project ID
            const pid = this.projectRef.key();

            // Add sites to project
            this.getSites().map((site, index) => {
                this.projectRef.child('sites').push(site);
            });

            // Update user with ownership
            firebaseRef.child(`users/${this.owner.id}/owner/`).push({
                id: pid,
                title: this.project.title
            });

            // Set membership in memberships/project
            firebaseRef.child(`members/${pid}/active/`).push(this.owner);

            // Display Success state
            this.setState({ showSuccess: true, projectId: pid });
        }
    },

    handleSwitchClick() {
        this.setState({ isPublic: !this.state.isPublic });
    },

    handleModalClose() {
        this.handleReset();
        window.scrollTo(0,0);
    },

    renderPrivacyInfo() {
        const info = this.state.isPublic
            ? (<p>Public projects aim at collaboration. Users can find your project and may request to join.</p>)
            : (<p>Private projects aim at privacy. Other users cannot find nor participate in private projects.</p>);

        return (
            <div className={ block('body') }>{ info }</div>
        );
    },

    renderError() {
        if (!this.hasErrors()) {
            return null;
        }

        return (
            <div className={ block('body', ['error']) }>
                <p>Please correct any errors to proceed.</p>
            </div>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { title, start, end, errors, isSubmitting } = this.state;
        const hasErrors = this.hasErrors();

        return (
            <form className={ block('form') } onSubmit={ this.handleSubmit } ref={ (form) => this.form = form }>
                <div className={ form('group') }>
                    <label>Project title</label>
                    <InputField
                        name="title"
                        error={ errors.title }
                        onBlur={ this.handleBlur }
                        onChange={ this.handleInputChange }
                        value={ title.value } />
                </div>
                <div className={ form('group') }>
                    <label>Start date <span className="label-body">Test</span></label>
                    <InputField
                        name="start"
                        error={ errors.start }
                        onBlur={ this.handleBlur }
                        onChange={ this.handleInputChange }
                        placeholder="yyyymmdd"
                        value={ start.value } />
                </div>
                <div className={ form('group') }>
                    <label>End date</label>
                    <InputField
                        name="end"
                        error={ errors.end || errors.order }
                        onBlur={ this.handleBlur }
                        onChange={ this.handleInputChange }
                        placeholder="yyyymmdd"
                        value={ end.value } />
                </div>
                <ButtonSwitch
                    className={ block('switch', ['privacy']) }
                    isActive={ this.state.isPublic }
                    onClick={ this.handleSwitchClick }
                    options={ this.state.togglePrivacy } />
                { this.renderPrivacyInfo() }
                { this.renderError() }
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass } disabled={ hasErrors || isSubmitting }>Create Project</button>
                    <button type="button" className={ block('button', ['reset']) } onClick={ this.handleReset }>Reset</button>
                </div>
            </form>
        );
    },

    renderSuccess() {
        if (!this.state.showSuccess) {
            return null;
        }
        return (
            <Modal>
                <ClickOutside onClick={ this.handleModalClose }>
                    <ProjectSuccess
                        projectId={ this.state.projectId }
                        onClose={ this.handleModalClose } />
                </ClickOutside>
            </Modal>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ContentBox>
                        { this.renderForm() }
                    </ContentBox>
                </div>
                { this.renderSuccess() }
            </div>
        );
    }

});

export default CreateView;
