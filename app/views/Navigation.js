import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase, getUser } from 'app/firebase';

import { overlayAdd, overlayRemove } from 'app/utils';
import { ClickOutside, NavLink, User } from 'app/components';

import { userUpdate, menuUpdate } from 'app/redux/actions';


const block = purebem.of('navigation');

const Navigation = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        location: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired,
        isMenuExpanded: PropTypes.bool.isRequired,
        isUserExpanded: PropTypes.bool.isRequired,
        onAuth: PropTypes.func.isRequired,
        toggleMenu: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    },

    componentWillMount() {
        firebase.auth().onAuthStateChanged((authData) => {
            if (authData) {
                this.props.onAuth(getUser(authData));
            }
        });
    },

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.handleMenuToggle(false);
        }
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

        this.props.toggleMenu('main', expanded);
    },

    handleUserToggle(expanded=false) {
        this.props.toggleMenu('user', expanded);
    },

    handleSignOut() {
        this.context.router.push('/login');
    },

    renderUser() {
        if (!this.props.user.uid) {
            return null;
        }
        return (
            <User data={ this.props.user }
                isExpanded={ this.props.isUserExpanded }
                onSignOut={ this.handleSignOut }
                onToggle={ this.handleUserToggle } />
        );
    },

    renderProfileNav() {
        if (!this.props.user.uid || this.isProject()) {
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
        if (!this.props.user.uid || !this.isProject()) {
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
        if (!this.props.user.uid) {
            return null;
        }

        return (
            <div className={ block('toggle') } onClick={ () => this.handleMenuToggle(true) }>
                <div className={ block('burger') } />
            </div>
        );
    },

    render() {
        const active = !!this.props.user.uid;
        const expanded = this.props.isMenuExpanded;

        return (
            <header className={ block({ active, expanded }) }>
                { this.renderBurger() }
                <ClickOutside onClick={ () => expanded && this.handleMenuToggle() }>
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isMenuExpanded: state.menu.main.expanded,
        isUserExpanded: state.menu.user.expanded
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (user) => dispatch(userUpdate(user)),
        toggleMenu: (menu, expanded) => dispatch(menuUpdate(menu, { expanded }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
