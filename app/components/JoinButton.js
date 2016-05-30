import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('join-button');

const JoinButton = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired
    },

    handleClick() {
        console.log('button clicked', this.props.data);
    },

    render() {
        return (
            <button type="button" className={ block() } onClick={ this.handleClick }>Join</button>
        );
    }

});

export default JoinButton;