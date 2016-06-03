import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import promise from 'promise';

import { firebase, getUser } from 'app/firebase';
import { overlayAdd } from 'app/utils';
import { ContentBox, InputField, Spinner } from 'app/components';

import { userUpdate, userLogout } from 'app/redux/user';


const block = purebem.of('login-view');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propsTypes: {
        onLogin: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            email: '',
            isSubmitting: false,
            password: ''
        };
    },

    componentDidMount() {
        overlayAdd();
        
        firebase.auth().signOut().then(() => {
            console.log('user logged out');
            this.props.onLogout();
        });
    },

    passwordLogin(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },

    socialLogin(provider) {
        return firebase.auth().signInWithPopup(provider);
    },

    handleAuthResponse(loginPromise) {
        loginPromise.then(
            (authData) => {
                console.log('user logged in');
                this.props.onLogin(getUser(authData.user));
                this.setState({ isSubmitting: false });
                this.context.router.push('/profile');
            },
            (error) => {
                this.setState({ error: error.message });
            }
        );
    },

    handleFacebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        const loginPromise = this.socialLogin(provider);
        this.handleAuthResponse(loginPromise);
    },

    handleSubmit(evt) {
        evt.preventDefault();
        
        this.setState({ isSubmitting: true, error: '' });

        const { email, password } = this.state;
        const loginPromise = this.passwordLogin(email, password);
        
        this.handleAuthResponse(loginPromise);
    },

    handleChange(evt) {
        const { name, value } = evt.target;
        this.setState({ [name]: value, error: '' });
    },

    renderError() {
        if (!this.state.error) {
            return null;
        }

        return (
            <div className={ block('error') }>
                <span>Error: { this.state.error }</span>
            </div>
        );
    },

    renderSpinner() {
        if (!this.state.isSubmitting) {
            return null;
        }
        return <Spinner />;
    },

    renderPasswordLogin() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');
        return (
            <div className={ block('password-login') }>
                <form onSubmit={ this.handleSubmit }>
                    <div className="form__group">
                        <label>Email</label>
                        <InputField
                            name="email"
                            onChange={ this.handleChange }
                            value={ this.state.email } />
                    </div>
                    <div className="form__group">
                        <label>Password</label>
                        <InputField
                            name="password"
                            onChange={ this.handleChange }
                            type="password"
                            value={ this.state.password } />
                    </div>
                    <button type="submit" className={ buttonClass } disabled={ this.state.isSubmitting }>Login</button>
                </form>
                { this.renderSpinner() }
                { this.renderError() }
            </div>
        );
    },

    renderFacebookLogin() {
        const buttonClass = purebem.many(block('button', ['facebook']), 'button-primary');
        return (
            <div className={ block('social-login') }>
                <button type="button" className={ buttonClass } onClick={ this.handleFacebookLogin }>Continue with Facebook</button>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderPasswordLogin() }
                { this.renderFacebookLogin() }
            </div>
        );
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user) => dispatch(userUpdate(user)),
        onLogout: () => dispatch(userLogout())
    };
};

export default connect(null, mapDispatchToProps)(LoginView);
