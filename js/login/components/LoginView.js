import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import LoginButton from './LoginButton';
import LoginForm from './LoginForm';

import { Divider } from 'js/core/components';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/login/actions';


const block = purebem.of('login-view');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        root: PropTypes.string.isRequired,
        // ...
        error: PropTypes.string
    },

    componentDidMount() {
        firebase.auth().signOut();
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
                <div className={ block('error') }>
                    { this.props.error }
                </div>
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

const LoginViewContainer = connect(mapStateToProps)(LoginView);

export default attach(LoginViewContainer, { initialize, root: 'login' });
