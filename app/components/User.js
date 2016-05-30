import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { Avatar, ClickOutside, Divider, NavLink } from 'app/components';


const block = purebem.of('user');

const User = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired,
        isExpanded: PropTypes.bool.isRequired,
        onSignOut: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired
    },

    renderDropdown() {
        if (!this.props.isExpanded) {
            return null;
        }

        return (
            <nav className={ block('links') }>
                <NavLink baseClass={ block('link') } to="/profile">My Profile</NavLink>
                <Divider className={ block('divider') } />
                <div className={ block('link') } onClick={ this.props.onSignOut }>Sign Out</div>
            </nav>
        );
    },

    renderUser() {
        const { email, name, photoURL } = this.props.data;
        const expanded = this.props.isExpanded;
        const userName = name || email;

        return (
            <div className={ block({ expanded }) } onClick={ () => this.props.onToggle(!expanded) }>
                <div className={ block('profile') }>
                    <Avatar
                        className={ block('avatar') }
                        name={ userName }
                        url={ photoURL } />
                    <div className={ block('name') }>{ userName }</div>
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
