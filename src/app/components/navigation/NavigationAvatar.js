import React, { PropTypes } from 'react';
import purebem from 'purebem';

import './NavigationAvatar.less';


const block = purebem.of('navigation-avatar');

const NavigationAvatar = React.createClass({

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

    renderLetter() {
        const letter = this.props.userName.substring(0,1).toUpperCase();
        return (
            <div className={ block('letter') }>
                { letter }
            </div>
        );
    },

    renderPicture() {
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
                        : this.renderPicture()
                }
            </div>
        );
    }

});

export default NavigationAvatar;
