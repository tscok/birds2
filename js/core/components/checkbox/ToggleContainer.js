import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Toggle from './Toggle';

import { getComponent } from 'js/redux/components/utils';
import { toggle as update } from 'js/redux/components/core/actions';


const ToggleContainer = React.createClass({

    propTypes: {
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // redux
        active: PropTypes.bool,
        onClick: PropTypes.func
    },

    handleClick() {
        this.props.onClick(this.props.active);
    },

    render() {
        return (
            <Toggle
                active={ this.props.active }
                onClick={ this.handleClick } />
        );
    }
});

const mapStateToProps = (state, props) => {
    return {
        active: getComponent(state.components, props)
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: (value) => dispatch(update({
            root: props.root,
            path: props.path,
            value: !value
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleContainer);
