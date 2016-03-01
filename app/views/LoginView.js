import React, { PropTypes } from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';


const block = purebem.of('login');

const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    getInitialState() {
        return {
            isSubmitting: false
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
        const email = this.email.value;
        const password = this.password.value;

        this.setState({ isSubmitting: !this.state.isSubmitting });

        firebaseRef.authWithPassword(
            { email, password },
            this.onAuth,
            { remember: 'sessionOnly' }
        );
    },

    onChange() {
        this.setState({ error: '' });
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

    renderPasswordLogin() {
        const buttonClass = purebem.many(block('button', ['submit']), 'button-primary');

        return (
            <div className={ block('password-login') }>
                <form className={ block('form') } onSubmit={ this.onSubmit }>
                    <label className={ block('group') }>
                        <span className={ block('label') }>Email</span>
                        <input type="text" className={ block('input') } onChange={ this.onChange } ref={ (ref) => this.email = ref } />
                    </label>
                    <label className={ block('group') }>
                        <span className={ block('label') }>Password</span>
                        <input type="password" className={ block('input') } ref={ (ref) => this.password = ref } />
                    </label>
                    <button type="submit" className={ buttonClass } disabled={ this.state.isSubmitting }>Login</button>
                </form>
                { this.renderError() }
            </div>
        );
    },

    render() {
        return (
            <div className={ purebem.many(block(), 'container') }>
                { this.renderPasswordLogin() }
            </div>
        );
    }
});

export default LoginView;
