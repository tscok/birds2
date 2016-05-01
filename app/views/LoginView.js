import React, { PropTypes } from 'react';
import purebem from 'purebem';
import promise from 'promise';

import { firebaseRef } from 'app/utils';

import {
    ContentBox,
    InputField,
    Spinner
} from 'app/components';


const block = purebem.of('login-view');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    getInitialState() {
        return {
            email: '',
            isSubmitting: false,
            password: ''
        };
    },

    passwordLogin(userData) {
        return new promise((resolve, reject) => {
            firebaseRef.authWithPassword(userData, (error, authData) => {
                if (error) reject(error);
            });
        });
    },

    socialLogin(provider) {
        return new promise((resolve, reject) => {
            firebaseRef.authWithOAuthPopup(provider, (error, authData) => {
                if (error) reject(error);
                else resolve(authData);
            });
        });
    },

    handleAuthResponse(loginPromise) {
        this.setState({ isSubmitting: false });
        loginPromise.then(
            (authData) => {
                this.context.router.push('/profile');
            },
            (error) => {
                this.setState({ error: error.message });
            }
        );
    },
    
    handleSocialClick(provider) {
        const loginPromise = this.socialLogin(provider);
        this.handleAuthResponse(loginPromise);
    },

    handleSubmit(evt) {
        evt.preventDefault();
        const { email, password, isSubmitting } = this.state;
        const loginPromise = this.passwordLogin({ email, password });

        this.setState({ isSubmitting: !isSubmitting, error: '' });
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
                <button type="button" className={ buttonClass } onClick={ () => this.handleSocialClick('facebook') }>Continue with Facebook</button>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <ContentBox>
                    { this.renderPasswordLogin() }
                    { this.renderFacebookLogin() }
                </ContentBox>
            </div>
        );
    }
});

export default LoginView;
