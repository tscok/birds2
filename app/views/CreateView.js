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
    ButtonToggle,
    ClickOutside,
    ContentBox,
    InputField,
    ModalContainer,
    ProjectSuccess,
    ViewHeader
} from 'app/components';


const ERROR_TITLE = 'Please fill in a title.';
const ERROR_DATE = 'A valid date follows the pattern YYYYMMDD.';
const ERROR_END = 'A project must start before it can end, silly.';

const initialState = {
    errors: {},
    isSubmitting: false,
    project: {
        date: {
            end: '',
            start: ''
        },
        owner: {},
        isPublic: true,
        title: ''
    },
    showSuccess: false
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
            id: authData.uid,
            name: provider.displayName,
            avatar: provider.profileImageURL,
            role: 'owner'
        };

        const { project } = this.state;

        project.owner = {
            id: this.userData.id,
            name: this.userData.name
        };

        this.setState({ project });
    },

    handleInputChange(evt) {
        const { name, value } = evt.target;
        const { project } = this.state;

        if (name === 'title') {
            project.title = value;
        } else {
            project.date[name] = value;
        }

        this.setState({ project });
    },

    // hasErrors(errors) {
    //     errors = errors || this.state.errors;
    //     return Object.keys(omitBy(errors, isNull)).length;
    // },

    // validateAll() {
    //     let errors = {};

    //     ['title', 'start', 'end'].map(name => {
    //         assign(errors, this.validateField(name, this.state[name].value));
    //     });

    //     return errors;
    // },

    // validateField(name, value) {
    //     const error = {};
    //     const { start, end } = this.state;

    //     switch (name) {
    //         case 'title':
    //             error[name] = isEmpty(value) ? ERROR_TITLE : null;
    //             break;
    //         default:
    //             error[name] = !isDate(value) ? ERROR_DATE : null;

    //             if (isDate(start.value) && isDate(end.value)) {
    //                 error.order = start.value >= end.value ? ERROR_END : null;
    //             }
    //     };

    //     return error;
    // },

    // handleInputChange(evt) {
    //     const { name, value } = evt.target;
    //     const { errors } = cloneDeep(this.state);
    //     this.setState({ [name]: { value } });

    //     delayAction(() => {
    //         this.setState({ errors: assign(errors, this.validateField(name, value)) });
    //     });
    // },

    // handleReset() {
    //     this.form.reset();
    //     this.setState(cloneDeep(initialState));
    // },

    // handleSubmit(evt) {
    //     evt.preventDefault();
    //     const errors = this.validateAll();

    //     if (this.hasErrors(errors)) {
    //         this.setState({ errors });
    //         return;
    //     }

    //     const { title, start, end, sites, isPublic } = this.state;
    //     const format = 'YYYYMMDD';

    //     this.project = {
    //         date: {
    //             end: moment(end.value, format).unix(),
    //             start: moment(start.value, format).unix()
    //         },
    //         isPublic,
    //         owner: {
    //             id: this.owner.id,
    //             name: this.owner.name
    //         },
    //         title: title.value
    //     };

    //     console.log(this.getSites());

    //     // Add project
    //     this.projectRef = firebaseRef.child('projects').push(this.project, this.onComplete);
    // },

    // onComplete(error) {
    //     if (error) {
    //         console.log('Oh snap! An error occurred…', error);
    //     } else {
    //         console.log('success!');
    //         // Get project ID
    //         const pid = this.projectRef.key();

    //         // Add sites to project
    //         this.getSites().map((site, index) => {
    //             this.projectRef.child('sites').push(site);
    //         });

    //         // Update user with ownership
    //         firebaseRef.child(`users/${this.owner.id}/owner/`).push({
    //             id: pid,
    //             title: this.project.title
    //         });

    //         // Set membership in memberships/project
    //         firebaseRef.child(`members/${pid}/active/`).push(this.owner);

    //         // Display Success state
    //         this.setState({ showSuccess: true, projectId: pid });
    //     }
    // },

    // handleSwitchClick() {
    //     this.setState({ isPublic: !this.state.isPublic });
    // },

    // handleModalClose() {
    //     this.handleReset();
    //     window.scrollTo(0,0);
    // },

    renderPrivacyInfo() {
        const body = this.state.project.isPublic
            ? 'Public projects aim at collaboration. Users can find, and may request to join, public projects.'
            : 'Private projects aim at privacy. Users can not find, nor request to join, private projects.';

        return (
            <p className={ block('body') }>{ body }</p>
        );
    },

    // renderError() {
    //     if (!this.hasErrors()) {
    //         return null;
    //     }

    //     return (
    //         <div className={ block('body', ['error']) }>
    //             <p>Please correct any errors to proceed.</p>
    //         </div>
    //     );
    // },
    handleSubmit(evt) {
        evt.preventDefault();

        console.log(this.state.project);
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
            <ModalContainer>
                <ClickOutside onClick={ this.handleModalClose }>
                    <ProjectSuccess
                        projectId={ this.state.projectId }
                        onClose={ this.handleModalClose } />
                </ClickOutside>
            </ModalContainer>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { errors, project } = this.state;
        const toggleOptions = ['Public', 'Private'];

        return (
            <form className={ block('form') } onSubmit={ this.handleSubmit } ref={ (form) => this.form = form }>
                <div className="form__group">
                    <label>Project Name</label>
                    <InputField
                        name="title"
                        onChange={ this.handleInputChange }
                        value={ project.title } />
                </div>
                <div className="form__group">
                    <label>Project Start<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        name="start"
                        onChange={ this.handleInputChange }
                        value={ project.date.start } />
                </div>
                <div className="form__group">
                    <label>Project End<span className="label-body">- YYYYMMDD</span></label>
                    <InputField
                        name="end"
                        onChange={ this.handleInputChange }
                        value={ project.date.end } />
                </div>
                <div className={ block('privacy') }>
                    <ButtonToggle
                        className={ block('toggle') }
                        isActive={ project.isPublic }
                        options={ toggleOptions }
                        onClick={ this.handleToggle } />
                    { this.renderPrivacyInfo() }
                </div>
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass }>Create Project</button>
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
