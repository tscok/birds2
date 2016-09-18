import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { Avatar, Divider, NavLink } from 'js/core/components';


const block = purebem.of('navigation-user');

const NavigationUser = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        isExpanded: PropTypes.bool,
        isVisible: PropTypes.bool,
        user: PropTypes.shape({
            email: PropTypes.string,
            name: PropTypes.string,
            photoUrl: PropTypes.string,
            uid: PropTypes.string
        })
    },

    renderExpanded() {
        // wrap in ClickOutside component
        return this.renderUser();
    },

    renderUser() {
        const { email, name, photoUrl } = this.props.user;
        return (
            <div className={ block('user') }>
                <div className={ block('profile') }>
                    <Avatar
                        photoUrl={ photoUrl }
                        userName={ name || email } />
                    <div className={ block('user-name') }>{ name || email }</div>
                </div>
            </div>
        );
    },

    renderUserNav() {
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

    render() {
        console.log('navigation user', this.props);
        if (!this.props.isVisible) {
            return null;
        }

        return this.props.isExpanded
            ? this.renderExpanded()
            : this.renderUser()
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        isExpanded: component.user.expanded,
        isVisible: 'user' in state && !!state.user.uid,
        user: state.user
    };
};

export default connect(mapStateToProps)(NavigationUser);
