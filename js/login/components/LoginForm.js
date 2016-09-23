import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { firebase, getUser } from 'js/firebase';

import {
    Button,
    FormGroup,
    TextboxContainer
} from 'js/core/components';    

import { error, reset, submit } from 'js/redux/components/login/actions';
import { update } from 'js/redux/user/actions';


const LoginForm = React.createClass({

    propTypes: {
        onLogin: PropTypes.func.isRequired,
        root: PropTypes.string.isRequired,
        // ...
        onAuth: PropTypes.func,
        onError: PropTypes.func,
        onReset: PropTypes.func,
        onSubmit: PropTypes.func,
        username: PropTypes.string,
        password: PropTypes.string,
        submitting: PropTypes.bool
    },

    handleLogin(evt) {
        evt.preventDefault();
        const { username, password } = this.props;

        this.props.onSubmit(true);

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(this.handleSuccess, this.handleError)
            .then(() => this.props.onSubmit(false));
    },

    handleSuccess(auth) {
        console.log('success:', auth);
        this.props.onAuth(getUser(auth));
        this.props.onReset();
        this.props.onLogin();
    },

    handleError(error) {
        console.log('error', error);
        this.props.onError(error.message);
    },

    render() {
        return (
            <form onSubmit={ this.handleLogin }>
                <FormGroup label="Username">
                    <TextboxContainer
                        root={ this.props.root }
                        path="form.username" />
                </FormGroup>
                <FormGroup label="Password">
                    <TextboxContainer
                        root={ this.props.root }
                        path="form.password"
                        type="password" />
                </FormGroup>
                <Button
                    loading={ this.props.submitting }
                    submit={ true }
                    text="Login" />
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

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAuth: ({ email, name, photoUrl, uid }) => {
            dispatch(update({ email, name, photoUrl, uid }));
        },
        onError: (message) => dispatch(error({ message })),
        onReset: () => dispatch(reset()),
        onSubmit: (submitting) => dispatch(submit({
            root: props.root,
            path: 'form.submitting',
            submitting
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
