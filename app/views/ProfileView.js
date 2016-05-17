import React, { PropTypes } from 'react';
import purebem from 'purebem';
import promise from 'promise';

import { filter, map, uniq } from 'app/lodash';

import { firebaseRef } from 'app/utils';

import {
    NavLink,
    ProjectList,
    Spinner,
    Tabs,
    ViewHeader
} from 'app/components';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            projects: {},
            isLoading: true,
            activeTab: 'owner'
        };
    },

    componentDidMount() {
        const uid = firebaseRef.getAuth().uid;

        // Do an auth check here. Has login credentials expired, route to login.
        // Should probably be used in all views…

        this.usersRef = firebaseRef.child(`users/${uid}/projects`);

        this.usersRef.on('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.setState({ isLoading: false });
                return;
            }
            this.setState({ projects: snap.val(), isLoading: false });
        });
    },

    componentWillUnmount() {
        this.usersRef.off('value');
    },

    handleTabClick(tab) {
        this.setState({ activeTab: tab });
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
        const { projects, activeTab, isLoading } = this.state;

        if (isLoading) {
            return <Spinner />;
        }

        if (!Object.keys(projects).length) {
            return this.renderEmpty();
        }

        return (
            <div className={ block() }>
                <div className="container">
                    <Tabs
                        activeTab={ activeTab }
                        tabs={ uniq(map(projects, 'role')) }
                        onClick={ this.handleTabClick } />
                    <ProjectList
                        projects={ filter(projects, { 'role': activeTab }) } />
                </div>
            </div>
        );
    }

});

export default ProfileView;
