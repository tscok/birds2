import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import purebem from 'purebem';

import NavLink from './NavLink';


const block = purebem.of('user');

const User = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            visible: false
        };
    },

    toggleLinks(visible) {
        this.setState({ visible });
    },

    renderLinks() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <nav className={ block('links') }>
                <NavLink base={ block('link') } to="/profile">Profile</NavLink>
                <NavLink base={ block('link') } to="/login">Logout</NavLink>
            </nav>
        );
    },

    render() {
        const { profileImageURL, email } = this.props.data;
        const { visible } = this.state;

        return (
            <div className={ block() } onClick={ () => this.toggleLinks(!visible) }>
                <img className={ block('avatar') } src={ profileImageURL } />
                <div className={ block('name') }>{ email }</div>
                { this.renderLinks() }
            </div>
        );
    }
});

export default User;
