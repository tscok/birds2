import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { firebase } from 'app/firebase';

import {
    Button,
    FormGroup,
    TextboxContainer
} from 'app/core/components';

import { reset, submit } from 'app/redux/components/login/actions';


const LoginForm = React.createClass({

    propTypes: {
        onLogin: PropTypes.func.isRequired,
        root: PropTypes.string.isRequired,
        // ...
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
        // Redux: set user
        this.props.onReset();
        this.props.onLogin();
    },

    handleError(error) {
        // Redux: clear password
        // Redux: set login error
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
                    style="neutral"
                    type="submit">
                    Login
                </Button>
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
        onReset: () => dispatch(reset()),
        onSubmit: (submitting) => dispatch(submit({
            root: props.root,
            path: 'form.submitting',
            submitting
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
