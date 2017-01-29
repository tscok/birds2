import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { getUser } from 'js/firebase';

import LoginButton from './LoginButton';
import LoginForm from './LoginForm';

import {
    Attach,
    Divider
} from 'js/core/components';

import { error, initialize, reset, submit } from 'js/redux/components/login/actions';
import { update } from 'js/redux/user/actions';


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

    componentDidMount() {
        console.log('Login: signout');
        firebase.auth().signOut();
    },

    getLoggedInView() {
        this.context.router.push('/projects');
    },

    handleError(error) {
        this.props.onError(error.message);
    },

    handleSuccess(auth) {
        const data = 'user' in auth ? auth.user : auth;
        this.props.onAuth(getUser(data));
        this.props.onReset();
        this.getLoggedInView();
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
        onAuth: ({ email, name, photoUrl, provider, uid }) => {
            dispatch(update({ email, name, photoUrl, provider, uid }));
        },
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
