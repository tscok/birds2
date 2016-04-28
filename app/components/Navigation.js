import React, { PropTypes } from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import {
    overlayAdd,
    overlayRemove
} from 'app/utils';

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
            isMenuExpanded: false,
            isUserExpanded: false
        };
    },

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.handleMenuToggle(false);
        }
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
    
    handleMenuToggle(expanded) {
        switch (expanded) {
            case true:
                overlayAdd('navigation');
                break;
            default:
                overlayRemove();
        };
        
        this.setState({ isMenuExpanded: expanded });
    },

    handleUserToggle(expanded) {
        this.setState({ isUserExpanded: expanded });
    },

    renderUser() {
        if (!this.isLoggedIn()) {
            return null;
        }

        const authData = firebaseRef.getAuth();
        const userData = authData[authData.provider];

        return (
            <ClickOutside onClick={ () => this.handleUserToggle(false) }>
                <User data={ userData }
                      isExpanded={ this.state.isUserExpanded }
                      onClick={ this.handleUserToggle } />
            </ClickOutside>
        );
    },

    renderProfileNav() {
        if (!this.isLoggedIn() || this.isProject()) {
            return null;
        }

        return (
            <nav className={ block('links', ['profile']) }>
                <NavLink baseClass={ block('link') } to="/profile">My Profile</NavLink>
                <NavLink baseClass={ block('link') } to="/create">Create</NavLink>
                <NavLink baseClass={ block('link') } to="/search">Find</NavLink>
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
                <NavLink baseClass={ block('link') } to={ `/project/${id}/entry` }>Add Bird</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/members` }>Members</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/rings` }>Rings</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/export` }>Data</NavLink>
            </nav>
        );
    },

    renderBurger() {
        if (!this.isLoggedIn()) {
            return null;
        }

        return (
            <div className={ block('toggle') } onClick={ () => this.handleMenuToggle(true) }>
                <div className={ block('burger') } />
            </div>
        );
    },

    render() {
        const { isMenuExpanded } = this.state;
        const isMenuActive = this.isLoggedIn();

        return (
            <header className={ block({ 'active': isMenuActive, 'expanded': isMenuExpanded }) }>
                { this.renderBurger() }
                <ClickOutside onClick={ () => this.handleMenuToggle(false) }>
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
