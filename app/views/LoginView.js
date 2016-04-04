import React, { PropTypes } from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import ContentBox from 'app/components/ContentBox';
import Spinner from 'app/components/Spinner';


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
                <form className={ block('form') } onSubmit={ this.onSubmit }>
                    <div className="form__group">
                        <label className={ block('label') }>Email</label>
                        <input type="text" className={ block('input') } onChange={ this.onChange } ref={ (ref) => this.email = ref } />
                    </div>
                    <div className="form__group">
                        <label className={ block('label') }>Password</label>
                        <input type="password" className={ block('input') } ref={ (ref) => this.password = ref } />
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
                <ContentBox background="white" shadow={ true }>
                    { this.renderPasswordLogin() }
                </ContentBox>
            </div>
        );
    }
});

export default LoginView;
