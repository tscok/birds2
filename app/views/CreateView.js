import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import isNull from 'lodash.isnull';
import filter from 'lodash.filter';
import pick from 'lodash.pick';
import omitBy from 'lodash.omitby';
import debounce from 'lodash.debounce';
import cloneDeep from 'lodash.clonedeep';
import assign from 'lodash.assign';
import random from 'lodash.random';

import firebaseRef from 'app/firebaseRef';

import ButtonSwitch from 'app/components/ButtonSwitch';
import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import Modal from 'app/components/Modal';
import ProjectMap from 'app/components/ProjectMap';
import ProjectSites from 'app/components/ProjectSites';
import ProjectSuccess from 'app/components/ProjectSuccess';


const ERROR_TITLE = 'Please fill in a title.';
const ERROR_DATE = 'A valid date follows the pattern YYYYMMDD.';
const ERROR_END = 'A project must start before it can end, silly.';

const defaultState = {
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

const delayAction = debounce((action) => action(), 300);

const form = purebem.of('form');
const block = purebem.of('create-view');

const CreateView = React.createClass({

    componentWillMount() {
        this.setState(cloneDeep(defaultState));
        this.uid = firebaseRef.getAuth().uid;
    },

    isEmpty(str) {
        return !str || !str.trim().length;
    },

    isDate(str) {
        return moment(str, 'YYYYMMDD', true).isValid();
    },

    hasErrors(errors) {
        errors = errors || this.state.errors;
        return Object.keys(omitBy(errors, isNull)).length;
    },

    getSites() {
        return this.state.sites.filter(site => site.name).map(site => pick(site, ['latlng', 'name']));
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
                error[name] = this.isEmpty(value) ? ERROR_TITLE : null;
                break;
            default:
                error[name] = !this.isDate(value) ? ERROR_DATE : null;

                if (this.isDate(start.value) && this.isDate(end.value)) {
                    error.order = start.value >= end.value ? ERROR_END : null;
                }
        };

        return error;
    },

    handleChange(evt) {
        const { name, value } = evt.target;
        const { errors } = cloneDeep(this.state);
        this.setState({ [name]: { value } });

        delayAction(() => {
            this.setState({ errors: assign(errors, this.validateField(name, value)) });
        });
    },

    handleReset() {
        this.form.reset();
        this.handleSitesClear();
        this.setState(cloneDeep(defaultState));
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

        const data = {
            created: moment().unix(),
            title: title.value,
            start: moment(start.value, format).unix(),
            end: moment(end.value, format).unix(),
            public: isPublic,
            ownerId: this.uid,
            luckyNumber: random(0,360)
        };

        // Add project
        this.projectRef = firebaseRef.child('projects').push(data, this.onComplete);
    },

    onComplete(error) {
        if (error) {
            console.log('Oh snap! An error occurred…');
            return;
        }

        // Get project ID
        const pid = this.projectRef.key();

        // Add sites
        this.getSites().map((site, index) => {
            const newSite = assign(site, { projectId: pid, ownerId: this.uid });
            const siteRef = firebaseRef.child('sites').push(newSite);
            const sid = siteRef.key();

            // Update project/sites
            firebaseRef.child(`projects/${pid}/sites/${sid}`).set(true);
        });

        // Update user with ownership
        firebaseRef.child(`users/${this.uid}/projects/${pid}`).set(true);

        // Set membership in memberships/project
        firebaseRef.child(`members/${pid}/active/${this.uid}`).set(true);

        // Display Success state
        this.setState({ showSuccess: true, projectId: pid });
    },

    handleSwitch(name) {
        switch (name) {
            case 'privacy':
                this.setState({ isPublic: !this.state.isPublic });
                break;
            case 'maplock':
                this.setState({ isLocked: !this.state.isLocked });
                break;
        };
    },

    handleSiteAdd(marker) {
        const sites = [ ...this.state.sites, marker ];
        this.setState({ sites });
    },

    handleSiteChange(index) {
        return evt => {
            const { sites } = this.state;
            sites[index].name = evt.target.value;
            this.setState({ sites });
        }
    },

    handleSiteRemove(index) {
        let { sites } = this.state;
        sites[index].setMap(null);
        sites.splice(index, 1);
        this.setState({ sites });
    },

    handleSitesClear() {
        const sites = filter(this.state.sites, (item) => item.setMap(null));
        this.setState({ sites });
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

    renderErrorInfo() {
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
                        onChange={ this.handleChange }
                        value={ title.value } />
                </div>
                <div className={ form('group') }>
                    <label>Start date</label>
                    <InputField
                        name="start"
                        error={ errors.start }
                        onBlur={ this.handleBlur }
                        onChange={ this.handleChange }
                        placeholder="yyyymmdd"
                        value={ start.value } />
                </div>
                <div className={ form('group') }>
                    <label>End date</label>
                    <InputField
                        name="end"
                        error={ errors.end || errors.order }
                        onBlur={ this.handleBlur }
                        onChange={ this.handleChange }
                        placeholder="yyyymmdd"
                        value={ end.value } />
                </div>
                <ProjectSites
                    sites={ this.state.sites }
                    onChange={ (i) => this.handleSiteChange(i) }
                    onRemove={ (i) => this.handleSiteRemove(i) } />
                <ButtonSwitch
                    className={ block('switch', ['maplock']) }
                    isActive={ this.state.isLocked }
                    onClick={ () => this.handleSwitch('maplock') }
                    options={ this.state.toggleMapLock } />
                <div className={ block('body') }>
                    <p>Unlock the map to locate and mark your ringing sites. Geolocation data may be used for statistics.</p>
                </div>
                <ButtonSwitch
                    className={ block('switch', ['privacy']) }
                    isActive={ this.state.isPublic }
                    onClick={ () => this.handleSwitch('privacy') }
                    options={ this.state.togglePrivacy } />
                { this.renderPrivacyInfo() }
                { this.renderErrorInfo() }
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
                <ProjectSuccess
                    projectId={ this.state.projectId }
                    onClose={ this.handleModalClose } />
            </Modal>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ProjectMap
                        onClick={ this.handleSiteAdd }
                        sites={ this.state.sites }
                        unlocked={ !this.state.isLocked } />
                    <ContentBox background="white" shadow={ true }>
                        { this.renderForm() }
                    </ContentBox>
                </div>
                { this.renderSuccess() }
            </div>
        );
    }

});

export default CreateView;
