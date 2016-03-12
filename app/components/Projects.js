import React, { PropTypes } from 'react';
import purebem from 'purebem';

import ContentBox from 'app/components/ContentBox';
import NavLink from 'app/components/NavLink';


const block = purebem.of('projects');

const Projects = React.createClass({

    propTypes: {

    },

    renderEmpty() {
        return (
            <p className={ block('body', ['empty']) }>You are currently not participating in any projects.<br/>To get started you can either <NavLink to="/create">create a new project</NavLink> or <NavLink to="/search">search for projects</NavLink> to join.</p>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <ContentBox title="Projects" background="white" shadow={ true }>
                        { this.renderEmpty() }
                    </ContentBox>
                </div>
            </div>
        );
    }

});

export default Projects;