import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    Avatar,
    Divider,
    NavLink
} from 'app/components';


const block = purebem.of('user');

const User = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired,
        isExpanded: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
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

    render() {
        const { displayName, email, profileImageURL } = this.props.data;
        const { isExpanded } = this.props;

        return (
            <div className={ block({ active: isExpanded }) } onClick={ () => this.props.onClick(!isExpanded) }>
                <div className={ block('profile') }>
                    <Avatar className={ block('avatar') } url={ profileImageURL } />
                    <div className={ block('name') }>{ displayName || email }</div>
                    <div className={ block('chevron', { active: isExpanded }) } />
                </div>
                { this.renderDropdown() }
            </div>
        );
    }
});

export default User;
