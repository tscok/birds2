import React, { PropTypes } from 'react';
import purebem from 'purebem';

import {
    overlayAdd,
    overlayRemove
} from 'app/utils';


const block = purebem.of('modal-container');

const ModalContainer = React.createClass({

    propTypes: {
        children: PropTypes.node
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
                { this.props.children }
            </div>
        );
    }

});

export default ModalContainer;
