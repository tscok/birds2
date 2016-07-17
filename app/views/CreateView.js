import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import moment from 'moment';

import { firebase } from 'app/firebase';
import { omit, omitBy } from 'app/lodash';
import { isDate, isString } from 'app/utils';

import { Button, ButtonToggle, FormGroup, InputField, Lightbox, ProjectSuccess, ViewHeader } from 'app/components';

import { error, reset, update } from 'app/redux/create';


const ERROR_DATES = 'Please make sure dates are in order.';
const ERROR_WRITE = 'Sorry! The project could not be created. Please try again later.'

const INFO_PUBLIC = 'Public projects aim at collaboration. Users can find, and may request to join, your project.';
const INFO_PRIVATE = 'Private projects aim at privacy. Users cannot find, nor request to join, your project.';

const block = purebem.of('create-view');

const CreateView = React.createClass({

    propTypes: {
        error: PropTypes.string.isRequired,
        isValid: PropTypes.shape({
            dateEnd: PropTypes.bool.isRequired,
            dateStart: PropTypes.bool.isRequired,
            title: PropTypes.bool.isRequired
        }).isRequired,
        project: PropTypes.shape({
            dateEnd: PropTypes.string,
            dateStart: PropTypes.string,
            isPublic: PropTypes.bool,
            title: PropTypes.string,
            id: PropTypes.string
        }).isRequired,
        types: PropTypes.array.isRequired,
        // ...
        onInput: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        // ...
        user: PropTypes.shape({
            uid: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            photoURL: PropTypes.string
        }).isRequired
    },

    componentWillUnmount() {
        this.handleReset();
    },

    isFormInvalid() {
        const { isValid } = this.props;
        const invalid = omitBy(isValid, (valid) => valid);
        return Object.keys(invalid).length !== 0;
    },

    handleInput(evt) {
        const { name, value } = evt.target;
        const isValid = name === 'title' ? isString(value) : isDate(value);
        this.props.onInput(name, value, isValid);
    },

    handleCreate(evt) {
        evt.preventDefault();

        if (this.props.project.dateStart >= this.props.project.dateEnd) {
            this.props.onError(ERROR_DATES);
            return;
        }

        const projectRef = firebase.database().ref('projects').push();
        const { user } = this.props;
        const { dateStart, dateEnd } = this.props.project;
        const project = {
            ...omit(this.props.project, ['dateStart', 'dateEnd']),
            dates: {
                begin: moment(dateStart, 'YYYYMMDD').unix(),
                expire: moment(dateEnd, 'YYYYMMDD').unix(),
                timestamp: moment().unix()
            },
            id: projectRef.key,
            owner: user.name,
            ownerId: user.uid
        };

        projectRef.set(project).then(() => {
            firebase.database().ref(`groups/${project.id}/${user.uid}`).set({ status: 'owner', role: 'assistant' });
            firebase.database().ref(`users/${user.uid}/projects/${project.id}`).set({ status: 'owner' });
            this.props.onSuccess(project.id);
        }, (error) => {
            this.props.onError(ERROR_WRITE);
        });
    },

    handleReset() {
        this.props.onReset();
    },

    handleLightboxClose() {
        this.handleReset();
        window.scrollTo(0,0);
    },

    handleToggle(type) {
        this.props.onToggle(type);
    },
    
    renderSuccess() {
        if (this.props.project.id === '') {
            return null;
        }
        return (
            <Lightbox onClose={ this.handleLightboxClose }>
                <ProjectSuccess
                    projectId={ this.props.project.id }
                    onClose={ this.handleLightboxClose } />
            </Lightbox>
        );
    },

    renderErrorMessage() {
        if (this.props.error === '') {
            return null;
        }
        return (
            <p className={ block('body', ['error']) }>{ this.props.error }</p>
        );
    },

    renderPrivacyInfo() {
        const isPublic = this.props.project.type === 'Public';
        return (
            <p className={ block('body') }>{ isPublic ? INFO_PUBLIC : INFO_PRIVATE }</p>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { project } = this.props;

        return (
            <form className={ block('form') } onSubmit={ this.handleCreate }>
                <FormGroup label="Project Title">
                    <InputField
                        name="title"
                        onChange={ this.handleInput }
                        stretched={ true }
                        value={ project.title } />
                </FormGroup>
                <FormGroup
                    label="Start Date"
                    description="YYYYMMDD">
                    <InputField
                        maxLength="8"
                        name="dateStart"
                        onChange={ this.handleInput }
                        stretched={ true }
                        value={ project.dateStart } />
                </FormGroup>
                <FormGroup
                    label="End Date"
                    description="YYYYMMDD">
                    <InputField
                        maxLength="8"
                        name="dateEnd"
                        onChange={ this.handleInput }
                        stretched={ true }
                        value={ project.dateEnd } />
                </FormGroup>
                <div className={ block('privacy') }>
                    <ButtonToggle
                        active={ project.type }
                        className={ block('toggle') }
                        options={ this.props.types }
                        onClick={ this.handleToggle } />
                    { this.renderPrivacyInfo() }
                </div>
                <div className={ block('actions') }>
                    { this.renderErrorMessage() }
                    <Button
                        disabled={ this.isFormInvalid() }
                        style="success"
                        type="submit">
                        Create Project
                    </Button>
                    <Button
                        onClick={ this.handleReset }
                        style="default"
                        type="reset">
                        Reset
                    </Button>
                </div>
            </form>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="Create Project" />
                { this.renderForm() }
                { this.renderSuccess() }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        error: state.create.error,
        isValid: state.create.isValid,
        project: state.create.project,
        types: state.create.types,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onError: (message) => dispatch(error(message)),
        onInput: (field, value, isValid) => {
            dispatch(update('project', { [field]: value }));
            dispatch(update('isValid', { [field]: isValid }));
            dispatch(error());
        },
        onReset: () => dispatch(reset()),
        onSuccess: (id) => dispatch(update('project', { id })),
        onToggle: (type) => dispatch(update('project', { type }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
