import React, { PropTypes } from 'react';
import purebem from 'purebem';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/projects/actions';


const block = purebem.of('projects-view');

const ProjectsView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        root: PropTypes.string.isRequired
    },

    render() {
        return (
            <div className={ block() }>
                <h1></h1>
            </div>
        );
    }
});

export default attach(ProjectsView, { initialize, root: 'projects' });
