import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import purebem from 'purebem';

import { noop } from 'js/utils';


const block = purebem.of('button');

const RouteButton = React.createClass({

    propTypes: {
        color: PropTypes.oneOf([
            'blue', 'gray', 'green',
            'red', 'white', 'yellow',
            'facebook', 'outlined'
        ]),
        large: PropTypes.bool,
        onClick: PropTypes.func,
        stretched: PropTypes.bool,
        text: PropTypes.string,
        to: PropTypes.string
    },

    getDefaultProps() {
        return {
            color: 'outlined',
            large: false,
            onClick: noop,
            stretched: false,
            text: 'Button',
            to: ''
        };
    },

    render() {
        const { color, large, onClick, stretched, text, to } = this.props;
        return (
            <Link
                className={ block({ color, large, stretched }) }
                onClick={ onClick }
                to={ to }>
                { text }
            </Link>
        );
    }

});

export default RouteButton;
