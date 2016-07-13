import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('divider');

const Divider = React.createClass({

    propTypes: {
        className: PropTypes.string,
        text: PropTypes.string
    },

    getDefaultProps() {
        return {
            className: null,
            text: ''
        };
    },

    renderText() {
        if (this.props.text === '') {
            return null;
        }
        return (
            <span className={ block('text') }>{ this.props.text }</span>
        );
    },

    render() {
        const classNames = purebem.many(block(), this.props.className);

        return (
            <div className={ classNames }>
                { this.renderText() }
            </div>
        );
    }

});

export default Divider;
