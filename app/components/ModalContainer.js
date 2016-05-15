import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    overlayAdd,
    overlayRemove
} from 'app/utils';

import { ClickOutside } from 'app/components';


const block = purebem.of('modal-container');

const ModalContainer = React.createClass({

    propTypes: {
        children: PropTypes.node.isRequired,
        onClose: PropTypes.func.isRequired
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
                    { this.props.children }
                </ClickOutside>
            </div>
        );
    }

});

export default ModalContainer;
