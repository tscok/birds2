import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('avatar');

const Avatar = React.createClass({

    propTypes: {
        photoUrl: PropTypes.string,
        userName: PropTypes.string
    },

    getDefaultProps() {
        return {
            photoUrl: '',
            userName: ''
        };
    },

    getFirstLetter() {
        return this.props.userName.substring(0,1).toUpperCase();
    },

    renderLetter() {
        return (
            <div className={ block('letter') }>{ this.getFirstLetter() }</div>
        );
    },

    renderPhoto() {
        return (
            <img className={ block('picture') } src={ this.props.photoUrl } />
        );
    },

    render() {
        return (
            <div className={ block() }>
            {
                this.props.photoUrl === ''
                    ? this.renderLetter()
                    : this.renderPhoto()
            }
            </div>
        );
    }

});

export default Avatar;
