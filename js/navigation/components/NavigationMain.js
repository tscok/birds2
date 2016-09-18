import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';


const block = purebem.of('navigation-main');

const NavigationMain = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        visible: PropTypes.bool
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
        const id = '123';

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
        if (!this.props.visible) {
            return null;
        }

        return (
            <nav>[main navigation]</nav>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        visible: state.user && state.user.uid !== ''
    };
};

export default connect(mapStateToProps)(NavigationMain);
