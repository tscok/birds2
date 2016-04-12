import React, { PropTypes } from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import ContentBox from 'app/components/ContentBox';
import InputField from 'app/components/InputField';
import Spinner from 'app/components/Spinner';


const block = purebem.of('login');

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

    onAuth(error, authData) {
        this.setState({ isSubmitting: !this.state.isSubmitting });

        if (error) {
            this.setState({ error: error.message });
            return;
        }

        this.context.router.push('/profile');
    },

    onSubmit(evt) {
        evt.preventDefault();
        const { email, password } = this.state;

        this.setState({ isSubmitting: !this.state.isSubmitting, error: '' });

        firebaseRef.authWithPassword(
            { email, password },
            this.onAuth,
            { remember: 'sessionOnly' }
        );
    },

    onChange(evt) {
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
                <form onSubmit={ this.onSubmit }>
                    <div className="form__group">
                        <label>Email</label>
                        <InputField
                            name="email"
                            onChange={ this.onChange }
                            value={ this.state.email } />
                    </div>
                    <div className="form__group">
                        <label>Password</label>
                        <InputField
                            name="password"
                            onChange={ this.onChange }
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

    render() {
        return (
            <div className={ block() }>
                <ContentBox>
                    { this.renderPasswordLogin() }
                </ContentBox>
            </div>
        );
    }
});

export default LoginView;
