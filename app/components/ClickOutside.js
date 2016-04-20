import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';


const ClickOutside = React.createClass({

    mixins: [onClickOutside],

    propTypes: {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired
    },

    handleClickOutside() {
        this.props.onClick();
    },

    render() {
        return this.props.children;
    }

});

export default ClickOutside;
