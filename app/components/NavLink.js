import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import purebem from 'purebem';


const NavLink = React.createClass({

    propTypes: {
        base: PropTypes.string
    },

    getDefaultProps() {
        return {
            base: ''
        };
    },

    render() {
        const block = purebem.of(this.props.base);
        const active = block() + '--active';

        return (
            <Link { ...this.props } className={ block() } activeClassName={ active } />
        );
    }

});

export default NavLink;
