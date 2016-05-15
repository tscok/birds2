import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    Avatar,
    ClickOutside,
    Divider,
    NavLink
} from 'app/components';


const block = purebem.of('user');

const User = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired,
        isExpanded: PropTypes.bool.isRequired,
        onToggle: PropTypes.func.isRequired,
    },

    renderDropdown() {
        if (!this.props.isExpanded) {
            return null;
        }

        return (
            <nav className={ block('links') }>
                <NavLink baseClass={ block('link') } to="/profile">My Profile</NavLink>
                <Divider className={ block('divider') } />
                <NavLink baseClass={ block('link', ['logout']) } to="/login">Logout</NavLink>
            </nav>
        );
    },

    renderUser() {
        const { displayName, email, profileImageURL } = this.props.data;
        const expanded = this.props.isExpanded;

        return (
            <div className={ block({ expanded }) } onClick={ () => this.props.onToggle(!expanded) }>
                <div className={ block('profile') }>
                    <Avatar className={ block('avatar') } url={ profileImageURL } />
                    <div className={ block('name') }>{ displayName || email }</div>
                    <div className={ block('chevron', { expanded }) } />
                </div>
                { this.renderDropdown() }
            </div>
        );
    },

    renderUserExpanded() {
        return (
            <ClickOutside onClick={ this.props.onToggle }>
                { this.renderUser() }
            </ClickOutside>
        );
    },

    render() {
        return this.props.isExpanded
            ? this.renderUserExpanded()
            : this.renderUser();
    }
});

export default User;
