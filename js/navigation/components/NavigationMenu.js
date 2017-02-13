import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import NavigationLink from './NavigationLink';
import { RouteButton, NavLink } from 'js/core/components';


const block = purebem.of('navigation-menu');

const NavigationMenu = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        links: PropTypes.array.isRequired,
        onLogout: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired
    },

    isProject() {
        return !isNullOrEmpty(this.props.project.id);
    },

    // handleClick(route) {
    //     console.log(this.context);
    //     this.context.router.push(route);
    // },

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
            <NavigationLink
                className={ block('link') }
                key={ index }
                // onClick={ () => this.handleClick(link.to) }
                onClick={ this.props.onReset }
                to={ link.to }>
                { link.text }
            </NavigationLink>
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
