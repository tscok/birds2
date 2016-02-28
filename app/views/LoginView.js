import React, { PropTypes } from 'react';

import firebaseRef from 'app/firebaseRef';


const LoginView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    onAuth(error, authData) {
        if (error) {
            console.log(error);
            return;
        }

        this.context.router.push('/profile');
    },

    onSubmit(evt) {
        evt.preventDefault();
        const email = this.username.value;
        const password = this.password.value;

        firebaseRef.authWithPassword(
            { email, password },
            this.onAuth,
            { remember: 'sessionOnly' }
        );
    },

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={ this.onSubmit }>
                    <label>
                        <span>Username</span>
                        <input type="text" ref={ (ref) => this.username = ref } />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" ref={ (ref) => this.password = ref } />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
});

export default LoginView;
