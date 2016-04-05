import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('avatar');

const Avatar = React.createClass({

    propTypes: {
        name: PropTypes.string,
        status: PropTypes.string
    },

    getDefaultProps() {
        return {
            name: 'Avatar',
            status: ''
        };
    },

    render() {
        const { name, status } = this.props;
        const letter = name.substring(0,1);

        return (
            <div className={ block({ status: status.toLowerCase() }) }>{ letter }</div>
        );
    }

});

export default Avatar;
