import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { Avatar, Button, ClickOutside, NavLink } from 'js/core/components';
import { reset, toggle } from 'js/redux/components/navigation/actions';


const block = purebem.of('navigation-user');

const NavigationUser = React.createClass({

    propTypes: {
        links: PropTypes.array.isRequired,
        onLogout: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        root: PropTypes.string.isRequired,
        user: PropTypes.shape({
            email: PropTypes.string,
            name: PropTypes.string,
            photoUrl: PropTypes.string,
            provider: PropTypes.string,
            uid: PropTypes.string
        }).isRequired,
        // redux
        expanded: PropTypes.bool,
        onToggle: PropTypes.func
    },

    handleCollapse() {
        if (this.props.expanded) {
            this.props.onToggle(false);
        }
    },

    handleToggle() {
        this.props.onToggle(!this.props.expanded);
    },

    getUserName() {
        return this.props.user.name || this.props.user.email;
    },

    renderAvatar() {
        return (
            <div className={ block('avatar') }>
                <Avatar
                    photoUrl={ this.props.user.photoUrl }
                    userName={ this.getUserName() } />
            </div>
        );
    },

    renderName() {
        return (
            <div className={ block('name') }>{ this.getUserName() }</div>
        );
    },

    renderProvider() {
        const { provider } = this.props.user;
        const providedBy = provider === 'password' ? 'firebase.google.com' : provider;
        return (
            <div className={ block('provider') }>via { providedBy }</div>
        );
    },

    renderLink(link, index) {
        return (
            <NavLink
                key={ index }
                activeClass={ false }
                baseClass={ block('link') }
                onClick={ this.props.onReset }
                to={ link.to }>
                { link.text }
            </NavLink>
        );
    },

    renderExpanded() {

        return (
            <div className={ block('expanded') }>
                { this.renderInfo() }
                <nav className={ block('links') }>
                    {
                        [].map.call(this.props.links, this.renderLink)
                    }
                    <hr className={ block('divider') } />
                    <NavLink
                        activeClass={ false }
                        baseClass={ block('link') }
                        onClick={ this.props.onLogout }
                        to="/">Log out</NavLink>
                </nav>
            </div>
        );
    },

    renderInfo() {
        return (
            <div className={ block('info') }>
                { this.renderName() }
                { this.renderProvider() }
            </div>
        );
    },

    render() {
        return (
            <ClickOutside onClick={ this.handleCollapse }>
                <div className={ block() }>
                    <div className={ block('collapsed') } onClick={ this.handleToggle }>
                        { this.renderAvatar() }
                        { this.renderInfo() }
                    </div>
                    { this.props.expanded ? this.renderExpanded() : null }
                </div>
            </ClickOutside>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        expanded: component.user.expanded
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onReset: () => dispatch(reset()),
        onToggle: (expanded) => dispatch(toggle({
            root: props.root,
            path: 'user.expanded',
            expanded
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationUser);
