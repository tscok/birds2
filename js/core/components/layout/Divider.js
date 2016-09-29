import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { isNullOrEmpty } from 'js/utils';


const block = purebem.of('divider');

const Divider = React.createClass({

    propTypes: {
        text: PropTypes.string
    },

    renderText() {
        if (isNullOrEmpty(this.props.text)) {
            return null;
        }
        
        return (
            <span className={ block('text') }>{ this.props.text }</span>
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
