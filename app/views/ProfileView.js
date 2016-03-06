import React from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import NavLink from 'app/components/NavLink';


const block = purebem.of('profile-view');
const box = purebem.of('box');

const ProfileView = React.createClass({

    componentWillMount() {
        // firebaseRef.child('user/123/projects')
    },

    renderEmpty() {
        return (
            <div className={ box('body', ['empty']) }>
                <p>You are currently not participating in any projects.<br/>To get started you can either <NavLink to="/create">create a new project</NavLink> or <NavLink to="/search">search for projects</NavLink> to join.</p>
            </div>
        );
    },

    renderProjects() {
        return (
            <div className={ purebem.many(block('projects'), box(['border'])) }>
                <div className={ box('title') }>Projects</div>
                { this.renderEmpty() }
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    { this.renderProjects() }
                </div>
            </div>
        );
    }
});

export default ProfileView;
