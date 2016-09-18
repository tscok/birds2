import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Textbox from './Textbox';
import { textbox as textboxChange } from 'js/redux/components/core/actions';


const TextboxContainer = React.createClass({

    propTypes: {
        component: PropTypes.object,
        onChange: PropTypes.func,
        path: PropTypes.string,
        root: PropTypes.string
    },

    render() {
        return (
            <Textbox { ...this.props } />
        );
    }

});

const mapStateToProps = (state, props) => {
    return {
        component: state.components[props.root][props.path]
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChange: (value) => dispatch(textboxChange({
            root: props.root,
            path: props.path,
            value
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextboxContainer);
