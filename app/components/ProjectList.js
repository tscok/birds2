import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { ProjectListItem } from 'app/components';


const block = purebem.of('project-list');

const ProjectList = React.createClass({

    propTypes: {
        projects: PropTypes.object.isRequired
    },

    renderItem(pid, index) {
        const item = this.props.projects[pid];

        return (
            <ProjectListItem
                item={ item }
                key={ index }
                pid={ pid } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                {
                    [].map.call(Object.keys(this.props.projects), this.renderItem)
                }
            </div>
        );
    }

});

export default ProjectList;
