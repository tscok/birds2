import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isNullOrEmpty } from 'js/utils';

import { firebase, getUser } from 'js/firebase';

import { initialize, update } from 'js/redux/user/actions';


export default (AppComponent) => {

    const mapStateToProps = (state) => {
        return {
            auth: state.user.auth
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            onAuth: ({ email, name, photoUrl, provider, uid }) => {
                dispatch(update({ email, name, photoUrl, provider, uid }));
            },
            onMount: () => dispatch(initialize())
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(React.createClass({

        contextTypes: {
            router: PropTypes.object
        },

        propTypes: {
            location: PropTypes.object,
            // ...
            auth: PropTypes.object,
            onAuth: PropTypes.func,
            onMount: PropTypes.func
        },

        getDefaultProps() {
            return {
                auth: {}
            };
        },

        componentDidMount() {
            this.handleAuthChanges();
        },

        componentWillUpdate(nextProps) {
            const { auth, location } = nextProps;

            if (!auth.uid && location.pathname !== 'login') {
                console.log('Auth: unauthorized');
                this.getLoginView();
            }
        },

        handleAuthChanges() {
            firebase.auth().onAuthStateChanged((authData) => {

                const { uid } = this.props.auth;

                if (authData && !isNullOrEmpty(uid)) {
                    console.log('Auth: authorized');
                    return;
                } else if (authData) {
                    console.log('Auth: update');
                    this.props.onAuth(getUser(authData));
                } else {
                    console.log('Auth: reset');
                    this.props.onMount();
                    this.getLoginView();
                }
            });
        },

        getLoginView() {
            console.log('Auth: route to login');
            this.context.router.replace('/login');
        },

        render() {
            const { auth, children } = this.props;

            return (
                <AppComponent
                    auth={ auth }
                    children={ children } />
            );
        }

    }));
};