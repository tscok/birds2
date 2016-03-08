import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import firebaseRef from 'app/firebaseRef';

import ProjectMap from 'app/components/ProjectMap';
import ToggleButton from 'app/components/ToggleButton';


const block = purebem.of('create-view');

const CreateView = React.createClass({

    getInitialState() {
        return {
            dateEnd: '',
            dateStart: '',
            isSubmitting: false,
            options: [
                { text: 'Public', value: true },
                { text: 'Private', value: false }
            ],
            sites: [],
            title: ''
        };
    },

    onDateChange(name) {
        return evt => {
            const input = evt.target.value;
            const isValid = moment(input, 'YYYYMMDD', true).isValid();
            if (isValid) {
                this.setState({ [name]: input });
            }
        };
    },

    onFormReset() {
        this.form.reset();
        this.sitesReset();
    },

    onFormSubmit() {

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

    onToggleClick(index) {
        const options = this.state.options.map((item, i) => {
            item.value = i === index ? true : false;
            return item;
        });
        this.setState({ options });
    },

    sitesReset() {
        const sites = this.state.sites.filter(item => item.setMap(null));
        this.setState({ sites });
    },

    renderPrivacyText() {
        const active = this.state.options.filter(item => item.value === true);

        if (active[0].text === 'Private') {
            return <p>Private projects are a one man show. No one can find your project and you are on your own.</p>
        }

        return (
            <p>Public projects aim at collaboration. Users can find your project and may request to join.</p>
        );
    },

    renderMap() {
        return (
            <ProjectMap
                onMapClick={ this.onMapClick }
                sites={ this.state.sites } />
        );
    },

    renderSite(item, index) {
        return (
            <label className={ block('group') } key={ index }>
                <span className={ block('label') }>Site name { index + 1 }</span>
                <input type="text" className={ block('input', ['icon']) } value={ item.value } onChange={ this.onSiteChange(index) } />
                <i className={ block('remove') } onClick={ this.onSiteRemove(index) } />
            </label>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');

        return (
            <form className={ block('form') } onSubmit={ this.onSubmit } ref={ (form) => this.form = form }>
                <div className={ block('info') }>
                    <p>Use the map to locate and mark ringing sites. The GPS coordinates can be used to track individual birds.</p>
                </div>
                <label className={ block('group') }>
                    <span className={ block('label') }>Project title</span>
                    <input type="text" className={ block('input') } onChange={ (evt) => this.setState({ title: evt.target.value }) } />
                </label>
                <label className={ block('group') }>
                    <span className={ block('label') }>Start date - YYYYMMDD</span>
                    <input type="text" className={ block('input', ['icon']) } onChange={ this.onDateChange('dateStart') } />
                </label>
                <label className={ block('group') }>
                    <span className={ block('label') }>End date - YYYYMMDD</span>
                    <input type="text" className={ block('input', ['icon']) } onChange={ this.onDateChange('dateEnd') } />
                </label>
                {
                    [].map.call(this.state.sites, this.renderSite)
                }
                <ToggleButton
                    onClick={ this.onToggleClick }
                    options={ this.state.options }
                    className={ block('toggle-button') } />
                <div className={ block('info') }>{ this.renderPrivacyText() }</div>
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass } disabled={ this.state.isSubmitting } onClick={ this.onFormSubmit }>Create</button>
                    <button type="button" className={ block('button', ['reset']) } onClick={ this.onFormReset }>Reset</button>
                </div>
            </form>
        );
    },

    render() {
        console.log(this.state);
        return (
            <div className={ block() }>
                <div className="container">
                    { this.renderMap() }
                    <div className="box box--border">
                        { this.renderForm() }
                    </div>
                </div>
            </div>
        );
    }

});

export default CreateView;
