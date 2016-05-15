import React, { PropTypes } from 'react';
import purebem from 'purebem';
import promise from 'promise';

import {
    assign,
    forEach
} from 'app/lodash';

import {
    firebaseRef,
    getStatus,
    sortByKey
} from 'app/utils';

import {
    ButtonRadio,
    NavLink,
    ProjectList,
    Spinner,
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
            currentTab: 'owner'
        };
    },

    componentDidMount() {
        const uid = firebaseRef.getAuth().uid;

        this.usersRef = firebaseRef.child(`users/${uid}`);
        this.usersRef.on('value', this.handleValue);
    },

    componentWillUnmount() {
        this.usersRef.off('value');
    },

    handleValue(snap) {
        if (snap.numChildren() === 0) {
            this.setState({ isLoading: false });
            return;
        }
        this.setState({ projects: snap.val(), isLoading: false });
    },

    handleTabClick(tab) {
        this.setState({ currentTab: tab });
    },

    handleListItemClick(id) {
        this.context.router.push(`project/${id}`);
    },

    renderEmpty() {
        if (Object.keys(this.state.projects).length) {
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

    renderTab(tab, index) {
        const active = this.state.currentTab === tab;
        return (
            <span key={ index } className={ block('tab', { active }) } onClick={ () => this.handleTabClick(tab) }>{ tab }</span>
        );
    },

    renderListItem(id, index) {
        const item = this.state.projects[this.state.currentTab][id];
        return (
            <div key={ index } onClick={ () => this.handleListItemClick(id) }>{ item.title }</div>
        );
    },

    render() {
        if (this.state.isLoading) {
            return <Spinner />;
        }

        console.log(this.state.projects);

        return (
            <div className={ block() }>
                <div className="container">
                    { this.renderEmpty() }
                    <div className={ block('tabs') }>
                        {
                            Object.keys(this.state.projects).map(this.renderTab)
                        }
                    </div>
                    <div className={ block('list') }>
                        {
                            Object.keys(this.state.projects[this.state.currentTab]).map(this.renderListItem)
                        }
                    </div>
                </div>
            </div>
        );
    }

});

export default ProfileView;
