import React, { PropTypes } from 'react';
import purebem from 'purebem';

import ProjectsList from './ProjectsList';

import { Attach } from 'src/core/components';
import { initialize } from 'src/redux/components/projects/actions';


const block = purebem.of('projects-view');

const ProjectsView = React.createClass({

    propTypes: {
        root: PropTypes.string
    },

    render() {
        return (
            <div className={ block() }>
                <h1>ProjectsView</h1>
                {/*
                <ProjectsList
                    root={ this.props.root }
                    uid={ this.props.auth.uid } />
                */}
            </div>
        );
    }
});

export default Attach(ProjectsView, { initialize, root: 'projects' });
