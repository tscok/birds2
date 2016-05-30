import React from 'react';
import purebem from 'purebem';
import promise from 'promise';

import { firebase, getUser } from 'app/firebase';

import { filter, map, uniq } from 'app/lodash';

import { List, NavLink, ProjectListItem, Spinner, Tabs, ViewHeader } from 'app/components';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState() {
        return {
            projects: {},
            isLoading: true,
            activeTab: 'owner'
        };
    },

    componentDidMount() {
        this.usersRef = firebase.database().ref('users');
    },

    componentWillUnmount() {
        this.usersRef.off('value');
    },

    getData(uid) {
        this.usersRef.child(`${uid}/projects`).on('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.setState({ isLoading: false });
                return;
            }
            this.setState({ projects: snap.val(), isLoading: false });
        });
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
                    <List
                        list={ filter(projects, { 'role': activeTab }) }
                        item={ ProjectListItem } />
                </div>
            </div>
        );
    }

});

export default ProfileView;
