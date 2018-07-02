import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'src/firebase';

import {
    Button,
    FormGroup,
    TextboxContainer
} from 'src/core/components';


const block = purebem.of('login-form');

const LoginForm = React.createClass({

    propTypes: {
        onError: PropTypes.func,
        onSubmit: PropTypes.func,
        onSuccess: PropTypes.func,
        root: PropTypes.string,
        // ...
        username: PropTypes.string,
        password: PropTypes.string,
        submitting: PropTypes.bool
    },

    handleLogin(evt) {
        evt.preventDefault();
        const { username, password } = this.props;

        this.handleSubmit(true);

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(this.props.onSuccess, this.props.onError)
            .then(() => this.handleSubmit(false));
    },

    handleSubmit(submitting) {
        this.props.onSubmit(this.props.path, submitting);
    },

    render() {
        return (
            <form className={ block() } onSubmit={ this.handleLogin }>
                <FormGroup label="Username">
                    <TextboxContainer
                        path="form.username"
                        root="login"
                        stretched={ true }
                         />
                </FormGroup>
                <FormGroup label="Password">
                    <TextboxContainer
                        path="form.password"
                        root="login"
                        stretched={ true }
                        type="password" />
                </FormGroup>
                <div className={ block('submit') }>
                    <Button
                        color="gray"
                        loading={ this.props.submitting }
                        stretched={ true }
                        submit={ true }
                        text="Log in" />
                </div>
            </form>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        username: component.form.username.value,
        password: component.form.password.value,
        submitting: component.form.submitting
    };
};

export default connect(mapStateToProps)(LoginForm);
