import React from 'react';
import purebem from 'purebem';
import assign from 'lodash.assign';
import promise from 'promise';

import firebaseRef from 'app/firebaseRef';

import ProjectList from 'app/components/ProjectList';
import Spinner from 'app/components/Spinner';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    getInitialState() {
        return {
            projects: [],
            members: [],
            isLoading: true
        };
    },

    componentWillMount() {
        const uid = firebaseRef.getAuth().uid;

        this.userProjectsRef = firebaseRef.child(`users/${uid}/projects`);

        this.userProjectsRef.on('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.setState({ isLoading: false });
                return;
            }

            this.getProjects(snap);
        });
    },

    componentWillUnmount() {
        this.userProjectsRef.off('value');
    },

    getProjects(snap) {
        const total = snap.numChildren();
        const projects = [];
        const members = [];

        snap.forEach((item) => {
            this.getProject(item.key()).then(result => {
                projects.push(result);

                if (projects.length === total) {
                    this.setState({ projects, isLoading: false });
                }
            });

            this.getMembers(item.key()).then(result => {
                members.push(result);

                if (members.length === total) {
                    this.setState({ members });
                }
            });
        });
    },

    getProject(pid) {
        return new promise((resolve, reject) => {
            firebaseRef.child(`projects/${pid}`).once('value', (snap) => {
                const data = snap.val();
                data.projectId = pid;
                resolve(data);
            });
        });
    },

    getMembers(pid) {
        return new promise((resolve, reject) => {
            firebaseRef.child(`memberships/${pid}`).once('value', (snap) => {
                const data = {
                    memberCount: snap.child('member').numChildren(),
                    pendingCount: snap.child('pending').numChildren()
                };
                resolve(data);
            });
        });
    },

    render() {
        if (this.state.isLoading) {
            return <Spinner />;
        }

        return (
            <div className={ block() }>
                <ProjectList
                    projects={ this.state.projects }
                    members={ this.state.members } />
            </div>
        );
    }

});

export default ProfileView;
