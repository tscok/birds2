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

    componentWillUnmount() {
        this.usersRef.off('value');
    },

    componentWillReceiveProps(nextProps) {
        const { uid } = nextProps.user;
        this.usersRef = firebase.database().ref(`users/${uid}/projects`);

        if (this.props.user !== nextProps.user) {
            this.getProjects(nextProps.projects);
        }
    },

    getProjects(nextProjects) {
        this.usersRef.on('value', (snap) => {
            const projects = snap.val();

            if (!isEqual(nextProjects, projects)) {
                this.props.onUpdate({ projects, isLoading: false });
            }
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
