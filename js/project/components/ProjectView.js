import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('project-view');

const ProjectView = React.createClass({

    componentDidMount() {
        const id = this.props.params.id;
    },

    render() {
        return (
            <div className={ block() }>
                <h1>ProjectView</h1>
            </div>
        );
    }
});

export default ProjectView;
