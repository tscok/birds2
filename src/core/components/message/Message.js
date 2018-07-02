import React, { PropTypes } from 'react';
import purebem from 'purebem';


const block = purebem.of('message');

const Message = React.createClass({

    propTypes: {
        text: PropTypes.string,
        type: PropTypes.string,
        // redux
        visible: PropTypes.bool,
        onHide: PropTypes.func,
    },

    onHide() {
        this.props.onHide();
    },

    render() {
        const { visible, type } = this.props;

        return (
            <div className={ block({ visible, type }) }>
                <div className={ block('text') }>
                    { this.props.text }
                </div>
                <div className={ block('close') } onClick={ this.onHide } />
            </div>
        );
    }
});

const mapStateToProps = (state, props) => {
    return {
        visible: state.messages.visible,
        text: state.messages.text
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default Message;
