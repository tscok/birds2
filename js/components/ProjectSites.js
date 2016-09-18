import React, { PropTypes } from 'react';

import {
    InputField
} from 'app/components';


const ProjectSites = React.createClass({

    propTypes: {
        sites: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired
    },

    renderSite(item, index) {
        const siteNr = index + 1;
        return (
            <div className="form__group" key={ index }>
                <label>Site name { siteNr }</label>
                <InputField
                    iconClass="icon-cross"
                    iconClick={ () => this.props.onRemove(index) }
                    onChange={ this.props.onChange(index) }
                    value={ item.name } />
            </div>
        );
    },

    render() {
        return (
            <div>
                { [].map.call(this.props.sites, this.renderSite) }
            </div>
        );
    }

});

export default ProjectSites;
