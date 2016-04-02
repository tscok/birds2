import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('project-success');

const ProjectSuccess = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        projectId: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            projectId: ''
        };
    },

    handleReroute() {
        this.context.router.push(`project/${this.props.projectId}`);
    },

    render() {
        const primary = purebem.many(block('button', ['primary']), 'button', 'button-primary');
        return (
            <div className={ block() }>
                <div className={ block('header') }>
                    <i className={ block('icon') } />
                    <div className={ block('title') }>Good Job!</div>
                </div>
                <div className={ block('body') }>
                    <p className={ block('body-copy') }><strong>You just created a project.</strong><br />How would you like to proceed?</p>
                    <button className={ primary } onClick={ this.handleReroute }>Go to project</button>
                    <button className={ block('button') } onClick={ this.props.onClose }>Create another</button>
                </div>
            </div>
        );
    }

});

export default ProjectSuccess;
