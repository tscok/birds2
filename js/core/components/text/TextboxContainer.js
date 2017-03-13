import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Textbox from './Textbox';

import { noop } from 'js/utils';
import { getComponent } from 'js/redux/components/utils';
import { textbox as update } from 'js/redux/components/core/actions';


const TextboxContainer = React.createClass({

    propTypes: {
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // ...
        onChange: PropTypes.func,
        // redux
        onUpdate: PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            onChange: noop
        };
    },

    handleChange(value) {
        this.props.onChange(value);
        this.props.onUpdate(value);
    },

    render() {
        const { onChange, onUpdate, path, root, ...rest } = this.props;
        return (
            <Textbox { ...rest } onChange={ this.handleChange } />
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = getComponent(state.components, props);
    return {
        value: component.value
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdate: (value) => dispatch(update({
            root: props.root,
            path: props.path,
            value
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextboxContainer);
