import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    firebaseRef,
    overlayAdd,
    overlayRemove
} from 'app/utils';

import {
    ClickOutside,
    NavLink,
    User
} from 'app/components';


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
    
    handleMenuToggle(expanded=false) {
        switch (expanded) {
            case true:
                overlayAdd('navigation');
                break;
            default:
                overlayRemove();
        };
        
        this.setState({ isMenuExpanded: expanded });
    },

    handleUserToggle(expanded=false) {
        this.setState({ isUserExpanded: expanded });
    },

    renderUser() {
        if (!this.isLoggedIn()) {
            return null;
        }

        const authData = firebaseRef.getAuth();
        const userData = authData[authData.provider];
        const expanded = this.state.isUserExpanded;

        return (
            <User data={ userData }
                  isExpanded={ expanded }
                  onToggle={ this.handleUserToggle } />
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

    renderMenu() {
        return (
            <div className={ block('content') }>
                { this.renderProfileNav() }
                { this.renderProjectNav() }
                { this.renderUser() }
            </div>
        );
    },

    render() {
        const active = this.isLoggedIn();
        const expanded = this.state.isMenuExpanded;

        return (
            <header className={ block({ active, expanded }) }>
                { this.renderBurger() }
                <ClickOutside onClick={ () => expanded && this.handleMenuToggle() }>
                    { this.renderMenu() }
                </ClickOutside>
            </header>
        );
    }

});

export default Navigation;
