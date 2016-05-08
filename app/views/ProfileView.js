import React from 'react';
import purebem from 'purebem';
import promise from 'promise';

import { assign } from 'app/lodash';

import {
    firebaseRef,
    getStatus,
    sortByKey
} from 'app/utils';

import {
    NavLink,
    ProjectList,
    Spinner,
    ViewHeader
} from 'app/components';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    getInitialState() {
        return {
            projects: [],
            isLoading: true
        };
    },

    componentWillMount() {
        this.uid = firebaseRef.getAuth().uid;

        this.usersRef = firebaseRef.child(`users/${this.uid}/projects`);
        this.membersRef = firebaseRef.child('members');
        this.projectsRef = firebaseRef.child('projects');

        this.usersRef.on('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.setState({ isLoading: false });
                return;
            }

            this.getProjects(snap);
        });
    },

    componentWillUnmount() {
        this.usersRef.off('value');
    },

    getProjects(snap) {
        const total = snap.numChildren();
        const projects = [];

        snap.forEach((item) => {
            this.getProject(item.key()).then(result => {
                projects.push(result);

                if (projects.length === total) {
                    sortByKey(projects, 'status');
                    this.setState({ projects, isLoading: false });
                }
            });
        });
    },

    getProject(pid) {
        return new promise((resolve, reject) => {
            this.projectsRef.child(pid).once('value', (snap) => {
                const project = snap.val();
                project.id = pid;
                project.status = getStatus(project.dateStart, project.dateEnd);

                this.getMembers(pid).then(result => {
                    project.members = result;
                    resolve(project);
                });
            });
        });
    },

    getMembers(pid) {
        return new promise((resolve, reject) => {
            this.membersRef.child(pid).once('value', (snap) => {
                const data = {
                    active: snap.child('active').numChildren(),
                    pending: snap.child('pending').numChildren()
                };
                resolve(data);
            });
        });
    },

    renderEmpty() {
        if (this.state.projects.length) {
            return null;
        }

        const create = purebem.many(block('button', ['create']), 'button');
        const search = purebem.many(block('button', ['search']), 'button');

        return (
            <ViewHeader title="My Profile">
                <p>This page will show your projects, the ones you contribute to and those you have requested to join.</p>
                <div className={ block('actions') }>
                    <NavLink to="/create" baseClass={ create } activeClass={ false }>Create a project</NavLink>
                    <NavLink to="/search" baseClass={ search } activeClass={ false }>Find &amp; Join projects</NavLink>
                </div>
            </ViewHeader>
        );
    },

    render() {
        if (this.state.isLoading) {
            return <Spinner />;
        }

        return (
            <div className={ block() }>
                <div className="container">
                    { this.renderEmpty() }
                    <ProjectList projects={ this.state.projects } userId={ this.uid } />
                </div>
            </div>
        );
    }

});

export default ProfileView;
