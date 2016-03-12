import React from 'react';
import purebem from 'purebem';
import assign from 'lodash.assign';

import firebaseRef from 'app/firebaseRef';

import Greeting from 'app/components/Greeting';
import Projects from 'app/components/Projects';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    getInitialState() {
        return {
            user: {}
        };
    },

    componentWillMount() {
        this.authData = firebaseRef.getAuth();
        const userData = this.authData[this.authData.provider];
        this.setState({ user: userData });

        firebaseRef.child('users/' + this.authData.uid).on('value', (snap) => {
            const user = assign(userData, snap.val());
            this.setState({ user });
        });
    },

    onNameChange(name) {
        const uid = this.authData.uid;
        firebaseRef.child('users/' + uid).set({ name });
    },

    render() {
        return (
            <div className={ block() }>
                <Greeting user={ this.state.user } onSubmit={ this.onNameChange } />
                <Projects />
            </div>
        );
    }

});

export default ProfileView;
