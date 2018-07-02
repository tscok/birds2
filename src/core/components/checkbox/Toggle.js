import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { noop } from 'src/utils';


const block = purebem.of('toggle');

const Toggle = React.createClass({

    propTypes: {
        active: PropTypes.bool,
        onClick: PropTypes.func
    },

    getDefaultProps() {
        return {
            active: false,
            onClick: noop
        };
    },

    onKeyDown(evt) {
        switch (evt.which) {
            case 13: // enter
            case 32: // space
                this.props.onClick();
        }
    },

    render() {
        const { active } = this.props;
        return (
            <div
                className={ block({ active }) }
                onClick={ this.props.onClick }
                onKeyDown={ this.onKeyDown }
                tabIndex="0" />
        );
    }

});

export default Toggle;
