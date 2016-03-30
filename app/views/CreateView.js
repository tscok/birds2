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
import ProjectMap from 'app/components/ProjectMap';
import ProjectSites from 'app/components/ProjectSites';


const ERROR_TITLE = 'Please fill in a title.';
const ERROR_DATE = 'A valid date follows the pattern YYYYMMDD.';
const ERROR_END = 'A project must start before it can end, silly.';

const defaultState = {
    end: {},
    errors: {},
    isLocked: true,
    isPublic: true,
    isSubmitting: false,
    sites: [],
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
        const uid = firebaseRef.getAuth().uid;
        const format = 'YYYYMMDD';

        const data = {
            created: moment().format(format),
            title: title.value,
            start: moment(start.value, format).unix(),
            end: moment(end.value, format).unix(),
            public: isPublic,
            ownerId: uid,
            luckyNumber: random(0,360)
        };

        // 1. Add project
        const projectRef = firebaseRef.child('projects').push(data, this.onComplete('projects'));
        const pid = projectRef.key();

        // 2. Add sites
        this.getSites().map(site => {
            const siteRef = firebaseRef.child('sites').push(assign(site, { projectId: pid, ownerId: uid }), this.onComplete('sites'));
            const sid = siteRef.key();

            // 2.1 Update project/sites
            firebaseRef.child(`projects/${pid}/sites/${sid}`).set(true);
        });
        
        // 3. Update user with ownership
        firebaseRef.child(`users/${uid}/projects/${pid}`).set(true, this.onComplete('users'));

        // 4. Set membership in memberships/project
        firebaseRef.child(`memberships/${pid}/member/${uid}`).set(true, this.onComplete('memberships'));

        console.log('all done…');
    },

    onComplete(store) {
        return (error) => {
            console.log('Saving data to',store, error ? error : 'OK');
        };
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
                    <button type="submit" className={ buttonClass } disabled={ isSubmitting }>Create</button>
                    <button type="button" className={ block('button', ['reset']) } onClick={ this.handleReset }>Reset</button>
                </div>
            </form>
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
            </div>
        );
    }

});

export default CreateView;
