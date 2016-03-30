import React from 'react';
import purebem from 'purebem';
import assign from 'lodash.assign';
import promise from 'promise';

import firebaseRef from 'app/firebaseRef';

import ProjectList from 'app/components/ProjectList';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    getInitialState() {
        return {
            projects: [],
            isLoading: true
        };
    },

    componentWillMount() {
        const uid = firebaseRef.getAuth().uid;

        this.userProjectsRef = firebaseRef.child(`users/${uid}/projects`);
        this.projectsRef = firebaseRef.child('projects');

        this.userProjectsRef.on('value', (snap) => {
            if (snap.numChildren() > 0) {
                this.getProjects(snap);
            } else {
                this.setState({ isLoading: false });
            }
        });
    },

    componentWillUnmount() {
        this.userProjectsRef.off('value');
    },

    getProjects(snap) {
        const projects = [];
        snap.forEach((item) => {
            this.getProject(item.key()).then(result => {
                projects.push(result);

                if (projects.length === snap.numChildren()) {
                    this.setState({ projects, isLoading: false });
                }
            });
        });
    },

    getProject(id) {
        return new promise((resolve, reject) => {
            this.projectsRef.child(id).once('value', (child) => {
                const data = child.val();
                data.projectId = child.key();
                resolve(data);
            });
        });
    },

    render() {
        return (
            <div className={ block() }>
                <ProjectList projects={ this.state.projects } isLoading={ this.state.isLoading } />
            </div>
        );
    }

});

export default ProfileView;
