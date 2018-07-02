import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
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
        const className = this.props.activeClass ? `${block()}--active` : '';

        return (
            <Link { ...this.props } className={ block() } activeClassName={ className } />
        );
    }

});

export default NavLink;
