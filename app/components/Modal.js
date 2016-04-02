import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('modal');

const Modal = React.createClass({

    propTypes: {
        children: PropTypes.node
    },

    componentWillMount() {
        this.body = document.querySelector('body');
        this.body.className = 'overlay';
    },

    componentWillUnmount() {
        this.body.removeAttribute('class');
    },

    render() {
        return (
            <div className={ block() }>
                { this.props.children }
            </div>
        );
    }

});

export default Modal;
