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

import firebaseRef from 'app/firebaseRef';

import ButtonSwitch from 'app/components/ButtonSwitch';
import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import ProjectMap from 'app/components/ProjectMap';


const ERROR_TITLE = 'Please fill in a title.';
const ERROR_DATE = 'Please fill in a valid date.';
const ERROR_END = 'A project must start before it can end.';

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

    getSites() {
        return this.state.sites.filter(site => site.name).map(site => pick(site, ['latlng', 'name']));
    },

    hasErrors(errors) {
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

    onReset() {
        this.form.reset();
        this.onSitesClear();
        this.setState(cloneDeep(defaultState));
    },

    onSubmit(evt) {
        evt.preventDefault();
        const errors = this.validateAll();

        if (this.hasErrors(errors)) {
            this.setState({ errors });
            return;
        }

        console.log('submit…');
    },

    onSiteAdd(marker) {
        const sites = [ ...this.state.sites, marker ];
        this.setState({ sites });
    },

    onSiteChange(index) {
        return evt => {
            const { sites } = this.state;
            sites[index].name = evt.target.value;
            this.setState({ sites });
        }
    },

    onSiteRemove(index) {
        let { sites } = this.state;
        sites[index].setMap(null);
        sites = sites.filter((item, i) => index !== i);
        this.setState({ sites });
    },

    onSitesClear() {
        const sites = this.state.sites.filter(item => item.setMap(null));
        this.setState({ sites });
    },

    handleSwitchClick(name) {
        switch (name) {
            case 'privacy':
                this.setState({ isPublic: !this.state.isPublic });
                break;
            case 'maplock':
                this.setState({ isLocked: !this.state.isLocked });
                break;
        };
    },

    renderPrivacyInfo() {
        const info = this.state.isPublic
            ? (<p>Public projects aim at collaboration. Users can find your project and may request to join.</p>)
            : (<p>Private projects aim at privacy. Other users cannot find nor participate in these projects.</p>);

        return (
            <div className={ block('info') }>{ info }</div>
        );
    },

    renderSite(item, index) {
        return (
            <div className={ form('group') } key={ index }>
                <label className={ block('label') }>Site name { index + 1 }</label>
                <InputField
                    iconClass="icon-cross"
                    iconClick={ () => this.onSiteRemove(index) }
                    onChange={ this.onSiteChange(index) }
                    value={ item.name } />
            </div>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { title, start, end, errors, isSubmitting } = this.state;

        return (
            <form className={ block('form') } onSubmit={ this.onSubmit } ref={ (form) => this.form = form }>
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
                {
                    [].map.call(this.state.sites, this.renderSite)
                }
                <ButtonSwitch
                    className={ block('switch', ['maplock']) }
                    isActive={ this.state.isLocked }
                    onClick={ () => this.handleSwitchClick('maplock') }
                    options={ this.state.toggleMapLock } />
                <div className={ block('info') }>
                    <p>Unlock the map to locate and mark your ringing sites. Their coordinates can be used to monitor migratory movements.</p>
                </div>
                <ButtonSwitch
                    className={ block('switch', ['privacy']) }
                    isActive={ this.state.isPublic }
                    onClick={ () => this.handleSwitchClick('privacy') }
                    options={ this.state.togglePrivacy } />
                { this.renderPrivacyInfo() }
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass } disabled={ isSubmitting }>Create</button>
                    <button type="button" className={ block('button', ['reset']) } onClick={ this.onReset }>Reset</button>
                </div>
            </form>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ProjectMap
                        onClick={ this.onSiteAdd }
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
