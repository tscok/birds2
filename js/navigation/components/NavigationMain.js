import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { NavLink } from 'js/core/components';


const block = purebem.of('navigation-main');

const NavigationMain = React.createClass({

    propTypes: {
        isVisible: PropTypes.bool,
        project: PropTypes.object
    },

    getDefaultProps() {
        return {
            project: {}
        };
    },

    isProject() {
        return !!('id' in this.props.project) && this.props.project.id !== '';
    },

    renderRegularNav() {
        return (
            <nav className={ block('links') }>
                <NavLink baseClass={ block('link') } to="/profile">Profile</NavLink>
                <NavLink baseClass={ block('link') } to="/create">Create</NavLink>
                <NavLink baseClass={ block('link') } to="/search">Search</NavLink>
            </nav>
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

    render() {
        if (!this.props.isVisible) {
            return null;
        }

        if (this.isProject()) {
            return this.renderProjectNav();
        }

        return this.renderRegularNav();
    }

});

const mapStateToProps = (state) => {
    return {
        isVisible: state.user && state.user.uid !== '',
        project: state.components.project
    };
};

export default connect(mapStateToProps)(NavigationMain);
