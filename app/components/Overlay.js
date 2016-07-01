import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    noop,
    overlayAdd,
    overlayRemove
} from 'app/utils';

import { ClickOutside } from 'app/components';


const block = purebem.of('modal-container');

const Overlay = React.createClass({

    propTypes: {
        children: PropTypes.node.isRequired,
        // ...
        onClose: PropTypes.func
    },

    getDefaultProps() {
        return {
            onClose: noop
        };
    },

    componentWillMount() {
        overlayAdd();
    },

    componentWillUnmount() {
        overlayRemove();
    },

    render() {
        return (
            <div className={ block() }>
                <ClickOutside onClick={ this.props.onClose }>
                    <div className={ block('content') }>
                        { this.props.children }
                    </div>
                </ClickOutside>
            </div>
        );
    }

});

export default Overlay;
