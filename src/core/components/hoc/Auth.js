import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isNullOrEmpty } from 'src/utils';
import { firebase, getUser } from 'src/firebase';

import { initialize, update } from 'src/redux/user/actions';


const Auth = (Component) => {

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
            // router
            history: PropTypes.object,
            location: PropTypes.object,
            match: PropTypes.object,
            // redux
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

        // componentWillUpdate(nextProps) {
        //     const { auth, location } = nextProps;

        //     if (!auth.uid && location.pathname !== '/app/login') {
        //         console.log('Auth: unauthorized');
        //         // this.getLoginView();
        //     }
        // },

        handleAuthChanges() {
            firebase.auth().onAuthStateChanged((authData) => {

                if (authData) {
                    if (!isNullOrEmpty(this.props.auth.uid)) {
                        console.log('You are already logged in.');
                        // console.log('authData:', this.props.auth);
                        return;
                    }
                    console.log('You are logged in!');
                    this.props.onAuth(getUser(authData));
                } else {
                    console.log('You are not logged in.');
                    this.props.onMount();
                    // this.getLoginView();
                }
                // const { uid } = this.props.auth;
                // if (authData && !isNullOrEmpty(uid)) {
                //     console.log('Auth: success, carry on…');
                //     return;
                // } else if (authData) {
                //     console.log('Auth: update, carry on…');
                //     this.props.onAuth(getUser(authData));
                // } else {
                //     console.log('Auth: failed');
                //     this.props.onMount();
                //     this.getLoginView();
                // }
            });
        },

        // getLoginView() {
        //     console.log('Auth: go to /app/login');
        //     this.context.router.history.push('/app/login');
        // },

        render() {
            const { auth, history, location, match } = this.props;

            return (
                <Component
                    auth={ auth }
                    history={ history }
                    location={ location }
                    match={ match } />
            );
        }

    }));
};

export default Auth;
