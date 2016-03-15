import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import find from 'lodash.find';
import pick from 'lodash.pick';

import firebaseRef from 'app/firebaseRef';

import ButtonSwitch from 'app/components/ButtonSwitch';
import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import ProjectMap from 'app/components/ProjectMap';


const block = purebem.of('create-view');

const CreateView = React.createClass({

    getInitialState() {
        return {
            isPublic: true,
            isSubmitting: false,
            options: ['Public', 'Private'],
            sites: []
        };
    },

    isEmpty(string) {
        return !string || string.trim() === '';
    },

    onDateInput(name) {
        return evt => {
            const date = moment(evt.target.value, 'YYYYMMDD', true);
            if (date.isValid()) {
                this.setState({ [name]: date });
            }
        };
    },

    onTitleInput(evt) {
        const title = evt.target.value;
        if (!this.isEmpty(title)) {
            this.setState({ title });
        }
    },

    onFormReset() {
        this.form.reset();
        this.onSitesClear();
    },

    onFormSubmit(evt) {
        evt.preventDefault();

        let { title, start, end, sites } = this.state;

        console.log('submit');

        // Check title
        if (this.isEmpty(title)) {
            return this.setState({ error: { title: 'Please fill in a title.' } });
        }

        if (!start || !end) {
            return this.setState({ error: { date: 'Please fill in a start and end date.' } });
        }

        // Check dates - order
        if (start >= end) {
            return this.setState({ error: { date: 'The project must start before it can end, silly.' } });
        }

        if (sites.length) {
            // Filter out sites without a name. Reduce site information.
            sites = sites
                .filter(site => site.name)
                .map(site => pick(site, ['latlng', 'name']));
        }

        // Clear errors
        this.setState({ error: {} });

        const projectData = {
            title,
            start: start.unix(),
            end: end.unix(),
            user: firebaseRef.getAuth().uid
        };

        console.log(projectData);

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

    renderError(type) {
        if (!this.state.error || !this.state.error[type]) {
            return null;
        }

        return (
            <span className={ block('error') }>{ this.state.error[type] }</span>
        );
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
            <div className="form__group" key={ index }>
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
            <form className={ block('form') } onSubmit={ this.onFormSubmit } ref={ (form) => this.form = form }>
                <div className="form__group">
                    <label className={ block('label') }>Project title</label>
                    <input type="text" onInput={ this.onTitleInput } />
                    { this.renderError('title') }
                </div>
                <div className="form__group">
                    <label className={ block('label') }>Start date</label>
                    <input type="text" placeholder="yyyymmdd" onInput={ this.onDateInput('start') } />
                </div>
                <div className="form__group">
                    <label className={ block('label') }>End date</label>
                    <input type="text" placeholder="yyyymmdd" onInput={ this.onDateInput('end') } />
                    { this.renderError('date') }
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
                    <button type="button" className={ block('button', ['reset']) } onClick={ this.onFormReset }>Reset</button>
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
