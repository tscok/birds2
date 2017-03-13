import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('divider');

const Divider = React.createClass({

    propTypes: {
        text: PropTypes.string
    },

    getDefaultProps() {
        return {
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
        return (
            <div className={ block() }>
                <hr className={ block('ruler') } />
                { this.renderText() }
            </div>
        );
    }

});

export default Divider;
