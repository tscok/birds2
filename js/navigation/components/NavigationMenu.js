import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { NavLink } from 'js/core/components';


const block = purebem.of('navigation-menu');

const NavigationMenu = React.createClass({

    propTypes: {
        root: PropTypes.string,
        // ...
        project: PropTypes.object
    },

    isProject() {
        return !!('id' in this.props.project) && !isNullOrEmpty(this.props.project.id);
    },

    renderRegularNav() {
        return (
            <nav className={ block() }>
                <NavLink baseClass={ block('link') } to="/profile">Profile</NavLink>
                <NavLink baseClass={ block('link') } to="/create">Create</NavLink>
                <NavLink baseClass={ block('link') } to="/search">Search</NavLink>
            </nav>
        );
    },

    renderProjectNav() {
        const { id } = this.props.project;
        return (
            <nav className={ block() }>
                <NavLink baseClass={ block('link') } to={ `/project/${id}` }>Project</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/entry` }>New Entry</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/members` }>Members</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/rings` }>Rings</NavLink>
                <NavLink baseClass={ block('link') } to={ `/project/${id}/export` }>Data</NavLink>
            </nav>
        );
    },

    render() {
        if (this.isProject()) {
            return this.renderProjectNav();
        }

        return this.renderRegularNav();
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        project: state.components.project || {}
    };
};

export default connect(mapStateToProps)(NavigationMenu);
