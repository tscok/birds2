import React, { PropTypes } from 'react';
import { firebase } from 'src/firebase';


const LoginLogout = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    componentWillMount() {
        // Sign out - let Auth HOC handle the rest.
        firebase.auth().signOut();
    },

    render() {
        return null;
    }

});

export default LoginLogout;
