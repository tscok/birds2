import React from 'react';
import purebem from 'purebem';
import assign from 'lodash.assign';

import firebaseRef from 'app/firebaseRef';

import Projects from 'app/components/Projects';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    getInitialState() {
        return {
        };
    },

    componentWillMount() {
        this.authData = firebaseRef.getAuth();
        this.userData = this.authData[this.authData.provider];
    },

    render() {
        return (
            <div className={ block() }>
                <Projects />
            </div>
        );
    }

});

export default ProfileView;
