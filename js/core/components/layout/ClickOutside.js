import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';


const ClickOutside = onClickOutside(React.createClass({

    propTypes: {
        children: PropTypes.node,
        onClick: PropTypes.func
    },

    handleClickOutside(evt) {
        this.props.onClick(evt);
    },

    render() {
        return this.props.children;
    }

}));

export default ClickOutside;
