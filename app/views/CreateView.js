import React from 'react';
import purebem from 'purebem';
import moment from 'moment';

import firebaseRef from 'app/firebaseRef';

import ProjectMap from 'app/components/ProjectMap';


const block = purebem.of('create-view');

const CreateView = React.createClass({

    getInitialState() {
        return {
            isSubmitting: false,
            sites: []
        };
    },

    onMapClick(marker) {
        const sites = [ ...this.state.sites, marker ];
        this.setState({ sites });
    },

    onFormReset() {
        this.form.reset();
        this.sitesReset();
    },

    onSiteChange(index) {
        return evt => {
            const { sites } = this.state;
            sites[index].value = evt.target.value;
            this.setState({ sites });
        }
    },

    onSiteRemove(index) {
        let { sites } = this.state;
        sites[index].setMap(null);
        sites = sites.filter((item, i) => i !== index);
        this.setState({ sites });
    },

    sitesReset() {
        let { sites } = this.state;
        sites = sites.filter(item => item.setMap(null));
        this.setState({ sites });
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
                <span className={ block('label') }>Name of Site { index + 1 }</span>
                <input type="text" className={ block('input', ['removable']) } value={ item.value } onChange={ this.onSiteChange(index) } />
                <div className={ block('remove') } onClick={ () => this.onSiteRemove(index) }>X</div>
            </label>
        );
    },

    renderForm() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');

        return (
            <form className={ block('form') } onSubmit={ this.onSubmit } ref={ (form) => this.form = form }>
                <label className={ block('group') }>
                    <span className={ block('label') }>Project title</span>
                    <input type="text" className={ block('input') } />
                </label>
                <label className={ block('group') }>
                    <span className={ block('label') }>Start date - YYYYMMDD</span>
                    <input type="text" className={ block('input') } />
                </label>
                <label className={ block('group') }>
                    <span className={ block('label') }>End date - YYYYMMDD</span>
                    <input type="text" className={ block('input') } />
                </label>
                {
                    [].map.call(this.state.sites, this.renderSite)
                }
                <div className={ block('actions') }>
                    <button type="submit" className={ buttonClass } disabled={ this.state.isSubmitting }>Create Project</button>
                    <button type="button" className={ block('button', ['reset']) } onClick={ this.onFormReset }>Reset</button>
                </div>
            </form>
        );
    },

    render() {
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
