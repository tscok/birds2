import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import { Button, NavLink } from 'js/core/components';

import links from 'js/navigation/links';


const block = purebem.of('navigation-menu');

const NavigationMenu = React.createClass({

    propTypes: {
        onLogout: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        root: PropTypes.string.isRequired,
        // redux
        project: PropTypes.object
    },

    getDefaultProps() {
        return {
            project: {}
        };
    },

    isProject() {
        return !isNullOrEmpty(this.props.project.id);
    },

    renderLogout() {
        return (
            <div className={ block('logout') }>
                <Button
                    onClick={ this.props.onLogout }
                    stretched={ true }
                    text="Log out" />
            </div>
        );
    },

    renderNavLink(link, index) {
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
        const { id } = this.props.project;
        const navigation = this.isProject() ? links({ id }).project : links().regular;

        return (
            <div className={ block('content') }>
                <nav className={ block('links') }>
                    {
                        [].map.call(navigation, this.renderNavLink)
                    }
                </nav>
                { this.renderLogout() }
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        project: state.components.project
    };
};

export default connect(mapStateToProps)(NavigationMenu);
