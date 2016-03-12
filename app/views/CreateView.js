import React from 'react';
import purebem from 'purebem';
import moment from 'moment';
import find from 'lodash.find';

import firebaseRef from 'app/firebaseRef';

import ProjectMap from 'app/components/ProjectMap';
import ToggleButton from 'app/components/ToggleButton';
import ContentBox from 'app/components/ContentBox';


const block = purebem.of('create-view');

const CreateView = React.createClass({

    getInitialState() {
        return {
            title: '',
            start: '',
            end: '',
            options: [
                { label: 'Public', active: true },
                { label: 'Private', active: false }
            ],
            sites: [],
            isSubmitting: false
        };
    },

    isDateValid(path) {
        return moment(this.state[path], 'YYYYMMDD', true).isValid();
    },
    
    onChange(path) {
        return evt => this.setState({ [path]: evt.target.value });
    },
    
    onBlur() {
        // check if dates are valid
        const valid = this.isDateValid('end') && this.isDateValid('start');
        console.log('both valid', valid);
        // check if end > start
        const start = moment(this.state.start, 'YYYYMMDD');
        const end =  moment(this.state.end, 'YYYYMMDD');
        console.log('start < end', start.unix() < end.unix());
        // display errors
    },

    onReset() {
        this.form.reset();
        this.onSitesReset();
    },

    onSubmit(evt) {
        evt.preventDefault();
        const { title, start, end, sites } = this.state;
        const privacy = find(sites, 'active');
        
        console.log(this.state);
    },

    onMapClick(marker) {
        const sites = [ ...this.state.sites, marker ];
        this.setState({ sites });
    },

    onSiteChange(index) {
        return evt => {
            const { sites } = this.state;
            sites[index].value = evt.target.value;
            this.setState({ sites });
        }
    },

    onSiteRemove(index) {
        return evt => {
            evt.preventDefault();
            const sites = this.state.sites.filter((item, i) => {
                if (i === index) {
                    item.setMap(null);
                }
                return i !== index;
            });
            this.setState({ sites });
        };
    },

    onToggle(index) {
        const options = this.state.options.map((item, i) => {
            item.active = i === index ? true : false;
            return item;
        });
        this.setState({ options });
    },

    onSitesReset() {
        const sites = this.state.sites.filter(item => item.setMap(null));
        this.setState({ sites });
    },

    renderToggleInfo() {
        const option = find(this.state.options, 'active');
        let info;

        switch (option.label) {
            case 'Private':
                info = (<p>Private projects are the one man bands. No one will find your project, so you are left alone.</p>);
                break;
            default:
                info = (<p>Public projects aim at collaboration. Users can find your project and may request to join.</p>);
        }

        return (
            <div className={ block('info') }>{ info }</div>
        );
    },

    renderSite(item, index) {
        return (
            <label className={ block('group') } key={ index }>
                <span className={ block('label') }>Site name { index + 1 }</span>
                <input type="text" className={ block('input', ['icon']) } value={ item.value } onChange={ this.onSiteChange(index) } />
                <i className={ block('icon', ['remove']) } onClick={ this.onSiteRemove(index) } />
            </label>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        const { end, start } = this.state;

        return (
            <form className={ block('form') } onSubmit={ this.onSubmit } ref={ (form) => this.form = form }>
                <div className={ block('info') }>
                    <p>Use the map to locate and mark ringing sites. Their coordinates may be used to monitor migratory movements &mdash; in real-time!</p>
                </div>
                <label className={ block('group') }>
                    <span className={ block('label') }>Project title</span>
                    <input type="text" className={ block('input') } onChange={ this.onChange('title') } />
                </label>
                <label className={ block('group') }>
                    <span className={ block('label') }>Start date - YYYYMMDD</span>
                    <input type="text" className={ block('input') } onChange={ this.onChange('start') } />
                </label>
                <label className={ block('group') }>
                    <span className={ block('label') }>End date - YYYYMMDD</span>
                    <input type="text" className={ block('input') } onChange={ this.onChange('end') } onBlur={ this.onBlur } />
                </label>
                {
                    [].map.call(this.state.sites, this.renderSite)
                }
                <ToggleButton
                    onClick={ this.onToggle }
                    options={ this.state.options }
                    className={ block('toggle-button') } />
                { this.renderToggleInfo() }
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass } disabled={ this.state.isSubmitting } onClick={ this.onFormSubmit }>Create</button>
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
                        onMapClick={ this.onMapClick }
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
