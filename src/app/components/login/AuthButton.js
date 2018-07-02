import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { Button } from 'src/core/components';

import { firebase } from 'src/firebase';

import { message } from 'src/redux/core/actions';

// TODO: Create a Message component and message actions.


const block = purebem.of('auth-button');

const AuthButton = React.createClass({

    propTypes: {
        provider: PropTypes.oneOf(['anonymous', 'facebook']),
        redirectTo: PropTypes.string,
        root: PropTypes.string,
        text: PropTypes.string,
        // redux
        onError: PropTypes.func
    },

    componentWillMount() {
        this.handleProviderResult();
    },

    getProvider() {
        switch (this.props.provider) {
            case 'facebook':
                return new firebase.auth.FacebookAuthProvider();
        }
    },

    handleAnonymousAuth() {
        firebase.auth().signInAnonymously()
            .then(() => this.props.onReset())
            .catch((error) => this.props.onError(error));
    },

    handleProviderAuth() {
        const provider = this.getProvider();
        firebase.auth().signInWithRedirect(provider);
    },

    handleProviderResult() {
        firebase.auth().getRedirectResult()
            .then(() => this.props.onReset())
            .catch((error) => this.props.onError(error));
    },

    render() {
        const { provider, text } = this.props;
        const onClick = provider === 'anonymous'
            ? this.handleAnonymousAuth
            : this.handleProviderAuth;

        return (
            <Button
                color={ provider }
                onClick={ onClick }
                stretch={ true }
                text={ text } />
        );
    }
});

const mapStateToProps = (state, props) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onError: ({ message }) => dispatch(message({ message, type: 'error' })),
        onReset: () => dispatch(message({ message: '' }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
