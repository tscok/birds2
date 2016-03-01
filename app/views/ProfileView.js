import React from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import NavLink from 'app/components/NavLink';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    componentWillMount() {
        // firebaseRef.child('user/123/projects')
    },

    renderProjectsEmpty() {
        return (
            <div className={ block('box-body', ['empty']) }>
                <p>You are currently not participating in any projects. To get started you can either create a new project or find &amp; join existing projects.</p>
                <NavLink to="/create" base="button">Create project</NavLink>
                <NavLink to="/search" base="button">Search projects</NavLink>
            </div>
        );
    },

    renderProjects() {
        return (
            <div className={ purebem.many(block('projects'), block('box')) }>
                <div className={ block('box-title') }>Projects</div>
                { this.renderProjectsEmpty() }
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    <h1 className={ block('title') }>Profile</h1>
                    { this.renderProjects() }
                </div>
            </div>
        );
    }
});

export default ProfileView;
