import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import isNull from 'lodash.isnull';
import filter from 'lodash.filter';
import find from 'lodash.find';
import pick from 'lodash.pick';
import omit from 'lodash.omit';
import omitBy from 'lodash.omitby';

import firebaseRef from 'app/firebaseRef';

import ButtonSwitch from 'app/components/ButtonSwitch';
import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import ProjectMap from 'app/components/ProjectMap';


const ERROR_TITLE = 'Please fill in a title.';
const ERROR_DATE = 'Please fill in a valid date.';
const ERROR_END = 'A project must start before it can end.';

const initState = {
    end: '',
    error: {},
    isPublic: true,
    isSubmitting: false,
    sites: [],
    start: '',
    title: ''
};

const form = purebem.of('form');
const block = purebem.of('create-view');

const CreateView = React.createClass({

    getInitialState() {
        return {
            options: ['Public', 'Private']
        };
    },

    componentWillMount() {
        this.setState(initState);
    },

    isEmpty(string) {
        return !string || string.trim() === '';
    },

    isDate(string) {
        return !this.isEmpty(string) && moment(string, 'YYYYMMDD', true).isValid();
    },

    isValidDateOrder() {
        const { start, end } = this.state;
        return this.isDate(start) && this.isDate(end) && start < end;
    },

    getSites() {
        return this.state.sites.filter(site => site.name).map(site => pick(site, ['latlng', 'name']));
    },

    getErrors() {
        return Object.keys(this.state.error).length;
    },

    onInput(name) {
        return evt => {
            const { value } = evt.target;
            const { error } = this.state;
            
            switch (name) {
                case 'title':
                    error.title = this.isEmpty(value) ? ERROR_TITLE : undefined;
                    break;
                default:
                    error[name] = !this.isDate(value) ? ERROR_DATE : undefined;
                    error.order = !this.isValidDateOrder() ? ERROR_END : undefined;
            };

            this.setState({ error, [name]: value });
        };
    },

    onReset() {
        this.form.reset();
        this.onSitesClear();
        this.setState(initState);
    },

    onSubmit(evt) {
        evt.preventDefault();

        if (this.getErrors() > 0) {
            return;
        }

        console.log('submit…');

        // add project to projects
        // add projectId to user
        // ...
    },

    onSiteAdd(marker) {
        const sites = [ ...this.state.sites, marker ];
        this.setState({ sites });
    },

    onSiteInput(index) {
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

    onSwitchClick() {
        this.setState({ isPublic: !this.state.isPublic });
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
                    onInput={ this.onSiteInput(index) }
                    value={ item.name } />
            </div>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { isSubmitting } = this.state;

        return (
            <form className={ block('form') } onSubmit={ this.onSubmit } ref={ (form) => this.form = form }>
                <div className={ form('group') }>
                    <label>Project title</label>
                    <InputField
                        error={ this.state.error.title }
                        onInput={ this.onInput('title') }
                        name="title" />
                </div>
                <div className={ form('group') }>
                    <label>Start date</label>
                    <InputField
                        error={ this.state.error.start }
                        onInput={ this.onInput('start') }
                        placeholder="yyyymmdd"
                        name="start" />
                </div>
                <div className={ form('group') }>
                    <label>End date</label>
                    <InputField
                        error={ this.state.error.end || this.state.error.order }
                        onInput={ this.onInput('end') }
                        placeholder="yyyymmdd"
                        name="end" />
                </div>
                {
                    [].map.call(this.state.sites, this.renderSite)
                }
                <div className={ block('info') }>
                    <p>Use the map to locate and mark your ringing sites. Their coordinates may be used to monitor migratory movements.</p>
                </div>
                <ButtonSwitch
                    className={ block('switch') }
                    isActive={ this.state.isPublic }
                    onClick={ this.onSwitchClick }
                    options={ this.state.options } />
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
                        sites={ this.state.sites } />
                    <ContentBox background="white" shadow={ true }>
                        { this.renderForm() }
                    </ContentBox>
                </div>
            </div>
        );
    }

});

export default CreateView;
