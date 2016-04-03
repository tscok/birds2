import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import purebem from 'purebem';


const NavLink = React.createClass({

    propTypes: {
        activeClass: PropTypes.bool,
        baseClass: PropTypes.string
    },

    getDefaultProps() {
        return {
            baseClass: '',
            activeClass: true
        };
    },

    render() {
        const block = purebem.of(this.props.baseClass);
        const active = this.props.activeClass ? `${block()}--active` : '';

        return (
            <Link { ...this.props } className={ block() } activeClassName={ active } />
        );
    }

});

export default NavLink;
