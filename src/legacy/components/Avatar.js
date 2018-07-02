import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('avatar');

const Avatar = React.createClass({

    propTypes: {
        name: PropTypes.string.isRequired,
        // ...
        className: PropTypes.string,
        status: PropTypes.string,
        url: PropTypes.string
    },

    getDefaultProps() {
        return {
            className: null,
            status: null,
            url: null
        };
    },

    renderLetter() {
        if (this.props.url) {
            return null;
        }

        const letter = this.props.name.substring(0,1).toUpperCase();

        return (
            <div className={ block('letter') }>{ letter }</div>
        );
    },

    renderImage() {
        if (!this.props.url) {
            return null;
        }

        return (
            <img className={ block('image') } src={ this.props.url } />
        );
    },

    render() {
        const { status, url } = this.props;
        const classNames = purebem.many(block({ url: !!url }), this.props.className);

        return (
            <div className={ classNames }>
                <div className={ block('badge', { status }) }>
                    { this.renderImage() }
                </div>
                { this.renderLetter() }
            </div>
        );
    }

});

export default Avatar;
