import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase, getUser } from 'src/firebase';

import AuthButton from './AuthButton';
import LoginButton from './LoginButton';
import LoginForm from './LoginForm';

import { Attach, Divider } from 'src/core/components';

import { error, initialize, reset, submit } from 'src/redux/components/login/actions';

import './LoginView.less';


const block = purebem.of('login-view');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        root: PropTypes.string.isRequired,
        // ...
        error: PropTypes.string,
        onAuth: PropTypes.func,
        onError: PropTypes.func,
        onReset: PropTypes.func
    },

    handleError(error) {
        this.props.onError(error.message);
    },

    handleSuccess() {
        this.props.onReset();
    },

    handleAnonymousLogin() {
        firebase.auth().signInAnonymously().catch(this.handleError);
    },

    renderError() {
        if (!this.props.error) {
            return null;
        }
        return (
            <div className={ block('error') }>{ this.props.error }</div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <LoginForm
                    onError={ this.handleError }
                    onSubmit={ this.props.onSubmit }
                    onSuccess={ this.handleSuccess }
                    root={ this.props.root } />
                <Divider text="or" />
                <LoginButton
                    onError={ this.handleError }
                    onSubmit={ this.props.onSubmit }
                    onSuccess={ this.handleSuccess }
                    path="facebook"
                    provider="facebook"
                    root={ this.props.root }
                    text="Continue with Facebook" />
                <Divider text="or" />
                <AuthButton
                    provider="anonymous"
                    redirectTo="/app"
                    root={ this.props.root }
                    text="Try it out!" />
                { this.renderError() }
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        error: component.error.message
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onError: (message) => dispatch(error({ message })),
        onReset: () => dispatch(reset()),
        onSubmit: (path, submitting) => dispatch(submit({
            root: props.root,
            path: `${path}.submitting`,
            submitting
        }))
    };
};

const LoginViewContainer = connect(mapStateToProps, mapDispatchToProps)(LoginView);

export default Attach(LoginViewContainer, { initialize, root: 'login' });
