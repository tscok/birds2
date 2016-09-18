import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { firebase, getUser } from 'js/firebase';

import { update } from 'js/redux/user/actions';


const AppAuth = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        children: PropTypes.node,
        pathname: PropTypes.string,
        // ...
        onAuth: PropTypes.func,
        uid: PropTypes.string
    },

    componentDidMount() {
        this.handleAuthChanges();
    },

    componentWillReceiveProps(nextProps) {
        if (!nextProps.uid && nextProps.pathname !== '/login') {
            this.getLoginRoute();
        }
    },

    getLoginRoute() {
        this.context.router.replace('/login');
    },

    handleAuthChanges() {
        firebase.auth().onAuthStateChanged((authData) => {
            if (authData) {
                this.props.onAuth(getUser(authData));
            } else {
                this.getLoginRoute();
            }
        });
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
        onAuth: ({ email, name, photoUrl, uid }) => {
            dispatch(update({ email, name, photoUrl, uid }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppAuth);
