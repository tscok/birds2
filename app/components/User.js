import React, { PropTypes } from 'react';
import purebem from 'purebem';

import Avatar from './Avatar';
import NavLink from './NavLink';


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
                <NavLink baseClass={ block('link') } to="/profile">Home</NavLink>
                <NavLink baseClass={ block('link', ['logout']) } to="/login">Logout</NavLink>
            </nav>
        );
    },

    render() {
        const { profileImageURL, email } = this.props.data;
        const { isExpanded } = this.props;

        return (
            <div className={ block({ active: isExpanded }) } onClick={ () => this.props.onClick(!isExpanded) }>
                <Avatar className={ block('avatar') } url={ profileImageURL } />
                <div className={ block('name') }>{ email }</div>
                { this.renderDropdown() }
            </div>
        );
    }
});

export default User;
