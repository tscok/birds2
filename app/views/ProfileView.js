import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { isEmpty } from 'app/lodash';
import { update } from 'app/redux/profile';
import {
    List,
    NavLink,
    ProjectListItem,
    Spinner,
    ViewHeader
} from 'app/components';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    propTypes: {
        isLoading: PropTypes.bool.isRequired,
        onUpdate: PropTypes.func.isRequired,
        projects: PropTypes.array.isRequired,
        // ...
        user: PropTypes.shape({
            uid: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            photoURL: PropTypes.string
        }).isRequired
    },

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.user.uid && nextProps.user.uid !== this.props.user.uid) {
            this.getProjects(nextProps.user.uid);
        }
    },

    componentWillMount() {
        const { uid } = this.props.user;
        if (uid) {
            this.getProjects(uid);
            this.setUserProfile();
        }
    },

    componentWillUnmount() {
        this.projectsRef.off('value', this.handleSnap);
    },

    setUserProfile() {
        const { user } = this.props;
        const profileRef = firebase.database().ref(`users/${user.uid}/profile`);
        profileRef.once('value', (snap) => {
            if (!snap.exists()) {
                profileRef.update({
                    email: user.email,
                    name: user.name,
                    photoURL: user.photoURL
                });
            }
        });
    },

    getProjects(uid) {
        this.projectsRef = firebase.database().ref(`users/${uid}/projects`);
        this.projectsRef.on('value', this.handleSnap);
    },

    handleSnap(snap) {
        const projects = [];

        new Promise((resolve, reject) => {
            if (!snap.exists()) {
                resolve(projects);
            }
            snap.forEach((childSnap) => {
                this.getProject(childSnap.key).then((data) => {
                    projects.push({ ...childSnap.val(), ...data });
                    if (snap.numChildren() === projects.length) {
                        resolve(projects);
                    }
                });
            });
        }).then((data) => {
            this.props.onUpdate({
                isLoading: false,
                projects: data
            });
        });
    },

    getProject(pid) {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`projects/${pid}`).on('value', (snap) => {
                resolve(snap.val());
            });
        });
    },

    renderProjects() {
        const { projects } = this.props;

        if (isEmpty(projects)) {
            return null;
        }

        return (
            <List
                list={ projects }
                listItem={ ProjectListItem } />
        );
    },

    renderEmpty() {
        if (!isEmpty(this.props.projects)) {
            return null;
        }

        const searchClass = purebem.many(block('button', ['search']), 'button');
        const createClass = purebem.many(block('button', ['create']), 'button');

        return (
            <ViewHeader title="My Profile">
                <p>This page will show your projects, the ones you contribute to and those you have requested to join.</p>
                <div className={ block('actions') }>
                    <NavLink to="/search" baseClass={ searchClass } activeClass={ false }>Find &amp; Join projects</NavLink>
                    <NavLink to="/create" baseClass={ createClass } activeClass={ false }>Create a project</NavLink>
                </div>
            </ViewHeader>
        );
    },

    render() {
        if (this.props.isLoading) {
            return <Spinner />;
        }

        return (
            <div className={ block() }>
                { this.renderEmpty() }
                { this.renderProjects() }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        isLoading: state.profile.isLoading,
        projects: state.profile.projects,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (data) => dispatch(update(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
