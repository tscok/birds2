import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('avatar');

const Avatar = React.createClass({

    propTypes: {
        name: PropTypes.string,
        status: PropTypes.string,
        url: PropTypes.string
    },

    getDefaultProps() {
        return {
            name: null,
            status: null,
            url: null
        };
    },

    renderLetter() {
        if (this.props.url || !this.props.name) {
            return null;
        }

        const letter = this.props.name.substring(0,1);

        return (
            <div className={ block('letter') }>{ letter }</div>
        );
    },

    renderImage() {
        if (!this.props.url) {
            return null;
        }

        return (
            <img className={ block('portrait') } src={ this.props.url } />
        );
    },

    render() {
        let { status } = this.props;

        return (
            <div className={ block({ status: !!status }) }>
                <div className={ block('badge', { status: !!status && status.toLowerCase() }) }>
                    { this.renderImage() }
                </div>
                { this.renderLetter() }
            </div>
        );
    }

});

export default Avatar;
