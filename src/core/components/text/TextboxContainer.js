import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Textbox from './Textbox';

import { noop } from 'src/utils';
import { getComponent } from 'src/redux/utils';
import { textbox as update } from 'src/redux/core/actions';


const TextboxContainer = React.createClass({

    propTypes: {
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // ...
        onChange: PropTypes.func,
        // redux
        onUpdate: PropTypes.func.isRequired,
        // ...
        error: PropTypes.bool,
        valid: PropTypes.bool,
        value: PropTypes.string
    },

    getDefaultProps() {
        return {
            onChange: noop,
            error: false,
            valid: false,
            value: ''
        };
    },

    handleChange({ error, valid, value }) {
        this.props.onChange(value);
        this.props.onUpdate({ error, valid, value });
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
        error: component.error,
        valid: component.valid,
        value: component.value
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdate: ({ error, valid, value }) => {
            console.log(props);
            dispatch(update({
                root: props.root,
                path: props.path,
                error,
                valid,
                value
            }))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextboxContainer);
