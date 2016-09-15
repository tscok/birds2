import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { firebase, getUser } from './firebase';

import { update } from './redux/user/actions';


const AppInit = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        pathname: PropTypes.string,
        // ...
        onUpdate: PropTypes.func,
        uid: PropTypes.string
    },

    componentDidMount() {
        this.handleAuthChanges();
    },

    componentWillReceiveProps(nextProps) {
        /**
         * Return user to login if auth credentials are missing.
         */
        if (!nextProps.uid && nextProps.pathname !== '/login') {
            this.getLoginRoute();
        }
    },

    componentWillUpdate(nextProps) {

    },

    handleAuthChanges() {
        firebase.auth().onAuthStateChanged((authData) => {
            if (authData) {
                this.props.onUpdate(getUser(authData));
            } else {
                this.getLoginRoute();
            }
        });
    },

    getLoginRoute() {
        this.context.router.replace('/login');
    },

    render() {
        return this.props.children;
    }

});

const mapStateToProps = (state) => {
    return {
        uid: state.user.uid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: ({ email, name, photoUrl, uid }) => {
            dispatch(update({ email, name, photoUrl, uid }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppInit);
