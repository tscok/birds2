import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';

import { Button, NavLink } from 'js/core/components';


const block = purebem.of('navigation-menu');

const NavigationMenu = React.createClass({

    propTypes: {
        onLogout: PropTypes.func,
        root: PropTypes.string,
        // ...
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
                    color="none"
                    onClick={ this.props.onLogout }
                    stretched={ true }
                    text="Log out" />
            </div>
        );
    },

    renderProjectNav() {
        const { id } = this.props.project;
        return (
            <nav className={ block('links') }>
                <NavLink baseClass={ block('link') } to={ `/project/${id}` }>Project</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/entry` }>New Entry</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/members` }>Members</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/rings` }>Rings</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/export` }>Data</NavLink>
            </nav>
        );
    },

    renderRegularNav() {
        return (
            <nav className={ block('links') }>
                <NavLink baseClass={ block('link') } to="/projects">My Projects</NavLink>
                <NavLink baseClass={ block('link') } to="/create">Create</NavLink>
                <NavLink baseClass={ block('link') } to="/search">Search</NavLink>
            </nav>
        );
    },

    render() {
        return (
            <div className={ block('content') }>
                { this.isProject() ? this.renderProjectNav() : this.renderRegularNav() }
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
