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

        componentWillReceiveProps(nextProps) {
            const { auth, location } = nextProps;

            if (!auth.uid && location.pathname !== '/login') {
                this.getLoginView();
            }
        },

        handleAuthChanges() {
            firebase.auth().onAuthStateChanged((authData) => {

                const { uid } = this.props.auth;

                if (authData && !isNullOrEmpty(uid)) {
                    return;
                } else if (authData) {
                    this.props.onAuth(getUser(authData));
                } else {
                    this.props.onMount();
                    this.getLoginView();
                }
            });
        },

        getLoginView() {
            this.context.router.replace('/login');
        },

        render() {
            const { onAuth, onMount, ...rest } = this.props;
            return (
                <AppComponent { ...rest } />
            );
        }

    }));
};