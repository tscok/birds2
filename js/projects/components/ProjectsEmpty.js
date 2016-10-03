import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { Button } from 'js/core/components';


const block = purebem.of('projects-empty');

const ProjectsEmpty = React.createClass({
    render() {
        return (
            <div className={ block() }>
                <h1>Starting fresh!</h1>
                <p>You are currently not participating in any projects.<br/>To get started, choose an action below.</p>
                <div className={ block('buttons') }>
                    <div className={ block('button') }>
                        <Button
                            color="none"
                            text="Create New Project"
                            to="/create" />
                    </div>
                    <div className={ block('button') }>
                        <Button
                            color="none"
                            text="Join Existing Project"
                            to="/search" />
                    </div>
                </div>
            </div>
        );
    }
});

export default ProjectsEmpty;
