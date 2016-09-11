import React, { PropTypes } from 'react';
import purebem from 'purebem';

import LoginButton from './LoginButton';
import LoginForm from './LoginForm';

import { Divider } from 'app/core/components';

import attach from 'app/redux/components/attach';
import { initialize } from 'app/redux/components/login/actions';


const block = purebem.of('login-view');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        root: PropTypes.string.isRequired,
    },

    componentDidMount() {
        firebase.auth().signOut();
    },

    handleRedirect() {
        this.context.router.push('/profile');
    },

    render() {
        return (
            <div className={ block() }>
                <h1>LoginView</h1>
                <LoginForm
                    onLogin={ this.handleRedirect }
                    root={ this.props.root } />
                <Divider text="or" />
                <LoginButton
                    onLogin={ this.handleRedirect }
                    path="facebook"
                    provider="facebook"
                    root={ this.props.root }
                    text="Continue with Facebook" />
            </div>
        );
    }

});

export default attach(LoginView, { initialize, root: 'login' });
