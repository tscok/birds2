import React, { PropTypes } from 'react';
import purebem from 'purebem';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/profile/actions';


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
            <div className={ block() }>
                <h1>ProfileView</h1>
            </div>
        );
    }
});

export default attach(ProfileView, { initialize, root: 'profile' });
