import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { firebase } from 'js/firebase';

import { Button } from 'js/core/components';


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

    componentDidMount() {
        this.getAuthProvider();
    },

    getAuthProvider() {
        switch (this.props.provider) {
            case 'facebook':
                this.authProvider = new firebase.auth.FacebookAuthProvider();
                break;
            default:
                this.authProvider = null;
        }
    },

    handleLogin() {
        if (!this.authProvider) {
            return;
        }

        this.handleSubmit(true);

        firebase.auth().signInWithPopup(this.authProvider)
            .then(this.props.onSuccess, this.props.onError)
            .then(() => this.handleSubmit(false));
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
                stretched={ true }
                text={ this.props.text } />
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        submitting: component[props.path].submitting
    };
};

export default connect(mapStateToProps)(LoginButton);
