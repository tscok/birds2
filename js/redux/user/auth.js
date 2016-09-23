import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

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
            onAuth: ({ email, name, photoUrl, uid }) => {
                dispatch(update({ email, name, photoUrl, uid }));
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

        componentDidMount() {
            this.handleAuthChanges();
        },

        componentWillReceiveProps(nextProps) {
            const { auth, location } = nextProps;

            if (!auth.uid && location.pathname !== '/login') {
                this.handleRouting();
            }
        },

        handleAuthChanges() {
            firebase.auth().onAuthStateChanged((authData) => {
                if (authData) {
                    this.props.onAuth(getUser(authData));
                } else {
                    this.props.onMount();
                    this.handleRouting();
                }
            });
        },

        handleRouting() {
            this.context.router.replace('/login');
        },

        render() {
            return (
                <AppComponent { ...this.props } />
            );
        }

    }));
};