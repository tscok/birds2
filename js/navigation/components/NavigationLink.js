import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import purebem from 'purebem';


const NavigationLink = React.createClass({

    propTypes: {
        children: PropTypes.any.isRequired,
        to: PropTypes.any.isRequired,
        // ...
        className: PropTypes.string,
        hasActiveClass: PropTypes.bool
    },

    getDefaultProps() {
        return {
            className: 'navigation-link',
            hasActiveClass: true
        };
    },

    render() {
        const { children, className, hasActiveClass, to } = this.props;
        const block = purebem.of(className);
        const activeClassName = hasActiveClass ? `${block()}--active` : '';

        return (
            <Link
                className={ block() }
                activeClassName={ activeClassName }
                // onClick={ this.props.onClick }
                to={ to }>
                { children }
            </Link>
        );
    }

});

export default NavigationLink;
