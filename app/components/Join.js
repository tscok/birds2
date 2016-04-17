import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('join');

const Join = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired
    },

    handleClick() {
        console.log(this.props.data);
    },

    render() {
        return (
            <button type="button" className={ block('button') } onClick={ this.handleClick }>Join</button>
        );
    }

});

export default Join;