import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import LoginButton from './LoginButton';
import LoginForm from './LoginForm';

import { Divider } from 'js/core/components';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/login/actions';
import { initialize as resetUser } from 'js/redux/user/actions';


const block = purebem.of('login-view');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        root: PropTypes.string.isRequired,
        // ...
        onSignOut: PropTypes.func
    },

    componentDidMount() {
        firebase.auth().signOut().then(() => {
            this.props.onSignOut();
        });
    },

    getProfileRoute() {
        this.context.router.push('/profile');
    },

    render() {
        return (
            <div className={ block() }>
                <h1>LoginView</h1>
                <LoginForm
                    onLogin={ this.getProfileRoute }
                    root={ this.props.root } />
                <Divider text="or" />
                <LoginButton
                    onLogin={ this.getProfileRoute }
                    path="facebook"
                    provider="facebook"
                    root={ this.props.root }
                    text="Continue with Facebook" />
            </div>
        );
    }

});

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => dispatch(resetUser())
    };
};

const LoginViewContainer = connect(null, mapDispatchToProps)(LoginView);

export default attach(LoginViewContainer, { initialize, root: 'login' });
