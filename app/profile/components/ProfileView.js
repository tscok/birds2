import React, { PropTypes } from 'react';
import purebem from 'purebem';

import attach from 'app/redux/components/attach';
import { initialize } from 'app/redux/components/profile/actions';


const block = purebem.of('profile-view');

const ProfileView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        root: PropTypes.string.isRequired
    },

    render() {
        return (
            <div class={ block() }>
                <h1>ProfileView</h1>
            </div>
        );
    }
});

export default attach(ProfileView, { initialize, root: 'profile' });
