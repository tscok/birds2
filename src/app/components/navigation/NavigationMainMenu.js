import React, { PropTypes } from 'react';
import { Link, NavLink } from 'react-router-dom';
import purebem from 'purebem';

import links from './links';
import { firebase } from 'src/firebase';

import './NavigationMainMenu.less';


const block = purebem.of('navigation-main-menu');

const NavigationMainMenu = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        onLogout: PropTypes.func,
        onReset: PropTypes.func,
        projectId: PropTypes.string
    },

    handleLogout() {
        // Sign out - let Auth HOC handle the rest.
        firebase.auth().signOut();
    },

    renderLink(link, index) {
        return (
            <NavLink
                activeClassName={ block('link', ['active']) }
                className={ block('link') }
                key={ index }
                onClick={ this.props.onReset }
                to={ link.to }>
                { link.text }
            </NavLink>
        );
    },

    render() {
        const options = links(this.props.projectId);

        return (
            <div className={ block() }>
                <nav className={ block('links') }>
                    {
                        options.map(this.renderLink)
                    }
                </nav>
                <span
                    className={ block('link', ['logout']) }
                    onClick={ this.handleLogout }>
                    Log out
                </span>
            </div>
        );
    }

});

export default NavigationMainMenu;
