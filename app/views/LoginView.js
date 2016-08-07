import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import promise from 'promise';

import { firebase, getUser } from 'app/firebase';
import { overlayAdd } from 'app/utils';
import { Button, ContentBox, Divider, FormGroup, InputField, Spinner } from 'app/components';

import { loginUpdate } from 'app/redux/login';
import { userUpdate, userLogout } from 'app/redux/user';


const block = purebem.of('login-view');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propsTypes: {
        error: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
        onError: PropTypes.func.isRequired,
        onLogin: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        password: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    },

    componentDidMount() {
        firebase.auth().signOut().then(() => {
            console.log('user logged out');
            this.props.onLogout();
        });
    },

    getUserData(authData, provider) {
        switch (provider) {
            case 'facebook':
                return getUser(authData.user);
            default:
                return getUser(authData);
        };
    },

    passwordLogin(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    socialLogin(provider) {
        return firebase.auth().signInWithPopup(provider);
    },

    handleAuthResponse(loginPromise, provider) {
        loginPromise.then(
            (authData) => {
                console.log('user logged in');
                this.props.onLogin(this.getUserData(authData, provider));
                this.props.onUpdate({ username: '', password: '' });
                this.context.router.push('/profile');
            },
            (error) => {
                console.log('login error');
                this.props.onError(error.message);
            }
        );
    },

    handleFacebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        const loginPromise = this.socialLogin(provider);
        this.handleAuthResponse(loginPromise, 'facebook');
    },

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onUpdate({ loading: true, error: '' });
        const { username, password } = this.props;
        const loginPromise = this.passwordLogin(username, password);
        this.handleAuthResponse(loginPromise, 'password');
    },

    handleChange(evt) {
        const { name, value } = evt.target;
        this.props.onUpdate({ [name]: value, error: '' });
    },

    renderError() {
        if (!this.props.error) {
            return null;
        }

        return (
            <div className={ block('error') }>
                <span>Error: { this.props.error }</span>
            </div>
        );
    },

    renderPasswordLogin() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        return (
            <div className={ block('password-login') }>
                <form onSubmit={ this.handleSubmit }>
                    <FormGroup label="Username">
                        <InputField
                            name="username"
                            onChange={ this.handleChange }
                            value={ this.props.username } />
                    </FormGroup>
                    <FormGroup label="Password">
                        <InputField
                            name="password"
                            onChange={ this.handleChange }
                            type="password"
                            value={ this.props.password } />
                    </FormGroup>
                    { this.renderError() }
                    <Button
                        loading={ this.props.loading }
                        stretched={ true }
                        style="neutral"
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    },

    renderFacebookLogin() {
        const buttonClass = purebem.many(block('button', ['facebook']));
        return (
            <div className={ block('social-login') }>
                <Button
                    onClick={ this.handleFacebookLogin }
                    stretched={ true }
                    style="facebook">
                    Continue with Facebook
                </Button>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderPasswordLogin() }
                <Divider className={ block('divider') } text="or" />
                { this.renderFacebookLogin() }
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    const component = state.login;
    return {
        error: component.error,
        loading: component.loading,
        password: component.password,
        username: component.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onError: (message) => dispatch(loginUpdate({ error: message, loading: false })),
        onLogin: (user) => dispatch(userUpdate({ ...user, loading: false })),
        onLogout: () => dispatch(userLogout()),
        onUpdate: (data) => dispatch(loginUpdate(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
