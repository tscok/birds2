import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { Button } from 'app/components';


const block = purebem.of('project-success');

const ProjectSuccess = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        projectId: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    },

    handleReroute() {
        this.context.router.push(`project/${this.props.projectId}`);
    },

    render() {
        const primary = purebem.many(block('button', ['primary']), 'button-primary');
        const outline = purebem.many(block('button'), 'button-outline');
        
        return (
            <div className={ block() }>
                <div className={ block('header') }>
                    <i className={ block('icon') } />
                </div>
                <div className={ block('body') }>
                    <p><strong>The project was successfully created!</strong><br />How would you like to proceed?</p>
                    <div className={ block('actions') }>
                        <Button
                            onClick={ this.handleReroute }
                            stretched={ true }
                            style="neutral">
                            Go to project
                        </Button>
                        <Button
                            onClick={ this.props.onClose }
                            stretched={ true }
                            style="default">
                            Create another
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

});

export default ProjectSuccess;
