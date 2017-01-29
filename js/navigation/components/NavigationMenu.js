import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import { RouteButton, NavLink } from 'js/core/components';


const block = purebem.of('navigation-menu');

const NavigationMenu = React.createClass({

    propTypes: {
        links: PropTypes.array.isRequired,
        onLogout: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        root: PropTypes.string.isRequired
    },

    isProject() {
        return !isNullOrEmpty(this.props.project.id);
    },

    renderLogout() {
        return (
            <div className={ block('logout') }>
                <RouteButton
                    onClick={ this.props.onLogout }
                    text="Log out"
                    to="/login" />
            </div>
        );
    },

    renderLink(link, index) {
        return (
            <NavLink
                key={ index }
                baseClass={ block('link') }
                onClick={ this.props.onReset }
                to={ link.to }>
                { link.text }
            </NavLink>
        );
    },

    render() {
        return (
            <div className={ block('content') }>
                <nav className={ block('links') }>
                    {
                        [].map.call(this.props.links, this.renderLink)
                    }
                </nav>
                { this.renderLogout() }
            </div>
        );
    }

});

export default NavigationMenu;
