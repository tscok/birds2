import React, { PropTypes } from 'react';
import purebem from 'purebem';
import onclickoutside from 'react-onclickoutside';

import NavLink from './NavLink';
import Avatar from './Avatar';


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
        if (!this.state.visible) {
            return;
        }
        console.log('click outside User');
        this.toggleLinks(false);
    },

    renderDropdown() {
        if (!this.state.visible) {
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
        const { visible } = this.state;

        return (
            <div className={ block({ active: visible }) } onClick={ () => this.toggleLinks(!visible) }>
                <Avatar className={ block('avatar') } url={ profileImageURL } />
                <div className={ block('name') }>{ email }</div>
                { this.renderDropdown() }
            </div>
        );
    }
});

export default User;
