import React, { PropTypes } from 'react';
import purebem from 'purebem';

import ProjectsList from './ProjectsList';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/projects/actions';


const block = purebem.of('projects-view');

const ProjectsView = React.createClass({

    propTypes: {
        auth: PropTypes.object.isRequired,
        root: PropTypes.string.isRequired
    },

    render() {
        if (!this.props.auth.uid) {
            return null;
        }

        return (
            <div className={ block() }>
                <ProjectsList
                    root={ this.props.root }
                    uid={ this.props.auth.uid } />
            </div>
        );
    }
});

export default attach(ProjectsView, { initialize, root: 'projects' });
