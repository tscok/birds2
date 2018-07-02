import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from 'src/core/components';

import { firebase } from 'src/firebase';


const LoginButton = React.createClass({

    propTypes: {
        onError: PropTypes.func,
        onSubmit: PropTypes.func,
        onSuccess: PropTypes.func,
        provider: PropTypes.string,
        path: PropTypes.string,
        root: PropTypes.string,
        text: PropTypes.string,
        // ...
        submitting: PropTypes.bool
    },

    componentWillMount() {
        this.handleRedirectResult();
    },

    getAuthProvider() {
        switch (this.props.provider) {
            case 'facebook':
                return new firebase.auth.FacebookAuthProvider();
            default:
                return null;
        }
    },

    handleRedirectResult() {
        firebase.auth().getRedirectResult().then((result) => {
            if (!result.user) {
                return;
            }
            console.log(result);
            this.props.onSuccess(result);
        }).catch((error) => {
            this.props.onError(error);
        });
    },

    handleLogin() {
        const authProvider = this.getAuthProvider();

        if (!authProvider) {
            return;
        }

        // Start spinner.
        this.handleSubmit(true);

        // Handle result on load, when returning from provider.
        firebase.auth().signInWithRedirect(authProvider);
    },

    handleSubmit(submitting) {
        this.props.onSubmit(this.props.path, submitting);
    },

    render() {
        return (
            <Button
                color={ this.props.provider }
                loading={ this.props.submitting }
                onClick={ this.handleLogin }
                stretch={ true }
                text={ this.props.text } />
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        submitting: component.submitting
    };
};

export default connect(mapStateToProps)(LoginButton);
