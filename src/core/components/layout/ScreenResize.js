import React, { PropTypes } from 'react';
import debounce from 'lodash.debounce';


const ScreenResize = React.createClass({

    propTypes: {
        children: PropTypes.node,
        onResize: PropTypes.func
    },

    componentDidMount() {
        window.addEventListener('resize', debounce(this.handleResize, 300));
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },

    handleResize() {
        this.props.onResize();
    },

    render() {
        return this.props.children;
    }

});

export default ScreenResize;
