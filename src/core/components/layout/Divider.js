import React, { PropTypes } from 'react';
import purebem from 'purebem';

import './Divider.less';


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
            <div className={ block('text') }>
                { this.props.text }
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderText() }
            </div>
        );
    }

});

export default Divider;
