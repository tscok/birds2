import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { getComponent } from 'src/redux/utils';
import { radio as update } from 'src/redux/core/actions';


const block = purebem.of('radio-button-group');

const RadioButtonGroup = React.createClass({

    propTypes: {
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // redux
        buttons: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    },

    renderButton(button, index) {
        const { active, label } = button;
        return (
            <div className={ block('button', { active }) } key={ index } onClick={ () => this.props.onClick({ label }) }>
                { label }
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                {
                    [].map.call(this.props.buttons, this.renderButton)
                }
            </div>
        );
    }
});

const mapStateToProps = (state, props) => {
    const component = getComponent(state.components, props);
    return {
        buttons: component.options
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: ({ label }) => dispatch(update({
            label,
            path: props.path,
            root: props.root
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonGroup);
