import React, { PropTypes } from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import ClickOutside from './ClickOutside';
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

    getInitialState() {
        return {
            isMenuOpen: false
        };
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

    handleCloseMenu() {
        if (!this.state.isMenuOpen) {
            return;
        }
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    },

    handleOpenMenu() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
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
                <NavLink baseClass={ block('link', ['profile']) } to="/profile">Home</NavLink>
                <NavLink baseClass={ block('link', ['create']) } to="/create">Create</NavLink>
                <NavLink baseClass={ block('link', ['search']) } to="/search">Find</NavLink>
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
                <NavLink baseClass={ block('link', ['project']) } to={ `/project/${id}` }>Dashboard</NavLink>
                <NavLink baseClass={ block('link', ['entry']) } to={ `/project/${id}/entry` }>Add Bird</NavLink>
                <NavLink baseClass={ block('link', ['members']) } to={ `/project/${id}/members` }>Members</NavLink>
                <NavLink baseClass={ block('link', ['rings']) } to={ `/project/${id}/rings` }>Rings</NavLink>
                <NavLink baseClass={ block('link', ['data']) } to={ `/project/${id}/export` }>Data</NavLink>
            </nav>
        );
    },

    renderBurger() {
        return (
            <div className={ block('burger') } onClick={ this.handleOpenMenu }>
                <div className={ block('burger-bar') } />
            </div>
        );
    },

    render() {
        return (
            <header className={ block({ open: this.state.isMenuOpen }) }>
                { this.renderBurger() }
                <ClickOutside onClick={ this.handleCloseMenu }>
                    <div className={ block('content') }>
                        { this.renderProfileNav() }
                        { this.renderProjectNav() }
                        { this.renderUser() }
                    </div>
                </ClickOutside>
            </header>
        );
    }

});

export default Navigation;
