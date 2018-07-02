import React from 'react';

import { firebaseRef } from 'app/utils';

import {
    pick,
    filter
} from 'app/lodash';

import {
    ProjectMap,
    ProjectSites
} from 'app/components';


const ProjectSitesView = React.createClass({

    getInitialState() {
        return {
            enabled: false,
            sites: []
        };
    },

    getSites() {
        return filter(this.state.sites, (site) => site.name).map(site => pick(site, ['latlng', 'name']));
    },

    handleMapClick(marker) {
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

    renderMap() {
        return (
            <ProjectMap
                enabled={ this.state.enabled }
                onClick={ this.handleMapClick }
                places={ this.state.sites } />
        );
    },

    renderSites() {
        return (
            <ProjectSites
                sites={ this.state.sites }
                onChange={ (index) => this.handleSiteChange(index) }
                onRemove={ (index) => this.handleSiteRemove(index) } />
        );
    },

    render() {
        return (
            <div>
                <h1>Sites</h1>
                { this.renderMap() }
                { this.renderSites() }
            </div>
        );
    }
});

export default ProjectSitesView;
