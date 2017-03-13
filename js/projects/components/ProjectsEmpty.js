import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { RouteButton } from 'js/core/components';


const block = purebem.of('projects-empty');

const ProjectsEmpty = React.createClass({

    propTypes: {
        uid: PropTypes.string
    },

    render() {
        return (
            <div className={ block() }>
                <h1>Your projects will appear here</h1>
                <p>Projects you have created, joined or requested to join will be listed on this page.</p>
                <div className={ block('buttons') }>
                    <div className={ block('button') }>
                        <RouteButton
                            large={ true }
                            text="Create New Project"
                            to="/create" />
                    </div>
                    <div className={ block('button') }>
                        <RouteButton
                            large={ true }
                            text="Join Existing Project"
                            to="/search" />
                    </div>
                </div>
            </div>
        );
    }
});

export default ProjectsEmpty;
