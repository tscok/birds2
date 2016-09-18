import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';


const block = purebem.of('avatar');

const Avatar = React.createClass({

    propTypes: {
        photoUrl: PropTypes.string,
        userName: PropTypes.string
    },

    renderLetter() {
        const letter = this.props.userName.substring(0,1).toUpperCase();
        console.log('letter', letter);
        return (
            <div className={ block('letter') }>{ letter }</div>
        );
    },

    renderPhoto() {
        return (
            <img className={ block('photo') } src={ this.props.photoUrl } />
        );
    },

    render() {
        return isNullOrEmpty(this.props.photoUrl)
            ? this.renderLetter()
            : this.renderPhoto();
    }

});

export default Avatar;
