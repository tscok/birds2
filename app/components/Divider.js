import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('divider');

const Divider = React.createClass({

    propTypes: {
        className: PropTypes.string
    },

    getDefaultProps() {
        return {
            className: null
        };
    },

    render() {
        const classNames = purebem.many(block(), this.props.className);

        return (
            <hr className={ classNames } />
        );
    }

});

export default Divider;
