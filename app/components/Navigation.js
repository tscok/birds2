import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import NavLink from './NavLink';
import User from './User';


const block = purebem.of('navigation');

const Navigation = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        location: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired
    },

    isLoggedIn() {
        return firebaseRef.getAuth() !== null;
    },

    isProject() {
        const route = this.props.location.pathname.split('/');
        const match = route.some(part => part === 'project');
        const { id } = this.props.params;

        return match === true && !!id;
    },

    renderUser() {
        if (!this.isLoggedIn()) {
            return null;
        }

        const authData = firebaseRef.getAuth();
        const userData = authData[authData.provider];

        return <User data={ userData } />;
    },

    renderProfileNav() {
        if (!this.isLoggedIn() || this.isProject()) {
            return null;
        }

        return (
            <nav className={ block('links', ['profile']) }>
                <NavLink baseClass={ block('link') } to="/profile">Profile</NavLink>
                <NavLink baseClass={ block('link') } to="/create">Create</NavLink>
                <NavLink baseClass={ block('link') } to="/search">Search</NavLink>
            </nav>
        );
    },

    renderProjectNav() {
        if (!this.isLoggedIn() || !this.isProject()) {
            return null;
        }

        const { id } = this.props.params;

        return (
            <nav className={ block('links', ['project']) }>
                <NavLink baseClass={ block('link') } to={ `/project/${id}` }>Dashboard</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/entry` }>New Entry</NavLink>
            {/*
                <NavLink baseClass={ block('link') } to={ `/project/${id}/members` }>Members</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/rings` }>Rings</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/export` }>Export Data</NavLink>
            */}
            </nav>
        );
    },

    render() {
        return (
            <header className={ block() }>
                { this.renderProfileNav() }
                { this.renderProjectNav() }
                { this.renderUser() }
            </header>
        );
    }

});

export default Navigation;
