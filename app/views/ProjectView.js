import React from 'react';


const ProjectView = React.createClass({
    render() {
        return (
            <div>
                <h1>Project</h1>
                { this.props.children }
            </div>
        );
    }
});

export default ProjectView;
