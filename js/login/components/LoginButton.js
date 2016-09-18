import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { firebase, getUser } from 'js/firebase';

import { Button } from 'js/core/components';

import { error, reset, submit } from 'js/redux/components/login/actions';
import { update } from 'js/redux/user/actions';


const LoginButton = React.createClass({

    propTypes: {
        onLogin: PropTypes.func.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // ...
        onAuth: PropTypes.func,
        onError: PropTypes.func,
        onReset: PropTypes.func,
        onSubmit: PropTypes.func,
        provider: PropTypes.string,
        submitting: PropTypes.bool,
        text: PropTypes.string
    },

    componentDidMount() {
        this.getAuthProvider();
    },

    getAuthProvider() {
        switch (this.props.provider) {
            case 'facebook':
                this.authProvider = new firebase.auth.FacebookAuthProvider();
                break;
            default:
                this.authProvider = null;
        }
    },

    handleLogin() {
        if (!this.authProvider) {
            return;
        }

        this.props.onSubmit(true);

        firebase.auth().signInWithPopup(this.authProvider)
            .then(this.handleLoginSuccess, this.handleLoginError)
            .then(() => this.props.onSubmit(false));
    },

    handleLoginSuccess(auth) {
        if (!('user' in auth)) {
            return;
        }
        this.props.onAuth(getUser(auth.user));
        this.props.onReset();
        this.props.onLogin();
    },

    handleLoginError(error) {
        this.props.onError(error.message);
    },

    render() {
        return (
            <Button
                loading={ this.props.submitting }
                onClick={ this.handleLogin }
                stretched={ true }
                style="neutral">
                { this.props.text }
            </Button>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        submitting: component[props.path].submitting
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAuth: ({ email, name, photoUrl, uid }) => {
            dispatch(update({ email, name, photoUrl, uid }));
        },
        onError: (message) => dispatch(error({ message })),
        onReset: () => dispatch(reset()),
        onSubmit: (submitting) => dispatch(submit({
            root: props.root,
            path: `${props.path}.submitting`,
            submitting
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
