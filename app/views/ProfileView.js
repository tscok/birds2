import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import promise from 'promise';

import { firebase } from 'app/firebase';

import { filter, isEqual, map, uniq } from 'app/lodash';

import { List, NavLink, ProjectListItem, Spinner, Tabs, ViewHeader } from 'app/components';

import { profileUpdate } from 'app/redux/profile';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    propTypes: {
        activeTab: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        // ...
        projects: PropTypes.object,
        user: PropTypes.shape({
            uid: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            photoURL: PropTypes.string
        }).isRequired
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.user.uid !== nextProps.user.uid) {
            this.getProjects(nextProps.user.uid);
        }
    },

    componentWillMount() {
        const { uid } = this.props.user;
        this.usersRef = firebase.database().ref('users');
        this.updateUser(uid);
        this.getProjects(uid);
    },

    updateUser(uid) {
        if (!uid) {
            return;
        }
        const { user } = this.props;
        const userRef = this.usersRef.child(`${uid}/data`);
        userRef.once('value', (snap) => {
            if (!snap.exists()) {
                userRef.update({
                    email: user.email,
                    name: user.name,
                    photoURL: user.photoURL
                });
            }
        });
    },

    getProjects(uid) {
        if (!uid) {
            return;
        }
        this.usersRef.child(`${uid}/projects`).on('value', (snap) => {
            const projects = snap.val();
            let roles = [];

            if (snap.exists()) {
                roles = uniq(map(projects, 'role'));
            }

            const activeTab = roles.length ? roles[0] : 'owner';

            this.props.onUpdate({
                activeTab,
                isLoading: false,
                projects
            });
        });
    },

    handleTabClick(activeTab) {
        this.props.onUpdate({ activeTab });
    },

    renderEmpty() {
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
        const { projects, activeTab, isLoading } = this.props;

        if (isLoading) {
            return <Spinner />;
        }

        if (!projects) {
            return this.renderEmpty();
        }

        return (
            <div className={ block() }>
                <div className="container">
                    <Tabs
                        activeTab={ activeTab }
                        tabs={ uniq(map(projects, 'role')) }
                        onClick={ this.handleTabClick } />
                    <List
                        list={ filter(projects, { 'role': activeTab }) }
                        item={ ProjectListItem } />
                </div>
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        activeTab: state.profile.activeTab,
        isLoading: state.profile.isLoading,
        projects: state.profile.projects,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (data) => dispatch(profileUpdate(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
