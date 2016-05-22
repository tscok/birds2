import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { firebaseRef } from 'app/utils';


const block = purebem.of('join-button');

const JoinButton = React.createClass({

    propTypes: {
        data: PropTypes.object.isRequired
    },

    handleClick() {
        console.log(this.props.data);
    },

    render() {
        const uid = firebaseRef.getAuth().uid;

        if (this.props.data.uid === uid) {
            return null;
        }

        return (
            <button type="button" className={ block() } onClick={ this.handleClick }>Join</button>
        );
    }

});

export default JoinButton;