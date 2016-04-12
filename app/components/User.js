import React, { PropTypes } from 'react';
import purebem from 'purebem';
import onclickoutside from 'react-onclickoutside';

import NavLink from './NavLink';


const block = purebem.of('user');

const User = React.createClass({

    mixins: [onclickoutside],

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

    handleClickOutside() {
        this.toggleLinks(false);
    },

    renderLinks() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <nav className={ block('links') }>
                <NavLink baseClass={ block('link') } to="/profile">Profile</NavLink>
                <NavLink baseClass={ block('link', ['logout']) } to="/login">Logout</NavLink>
            </nav>
        );
    },

    render() {
        const { profileImageURL, email } = this.props.data;
        const { visible } = this.state;

        return (
            <div className={ block({ active: visible }) } onClick={ () => this.toggleLinks(!visible) }>
                <img className={ block('avatar') } src={ profileImageURL } />
                <div className={ block('name') }>{ email }</div>
                { this.renderLinks() }
            </div>
        );
    }
});

export default User;
