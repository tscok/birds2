import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { ProjectListItem } from 'app/components';


const block = purebem.of('project-list');

const ProjectList = React.createClass({

    propTypes: {
        projects: PropTypes.array.isRequired
    },

    renderItem(item, index) {
        return (
            <ProjectListItem key={ index } item={ item } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                {
                    [].map.call(this.props.projects, this.renderItem)
                }
            </div>
        );
    }

});

export default ProjectList;
