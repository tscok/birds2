import React, { PropTypes } from 'react';

import { ref } from 'js/firebase';


const ProjectMembersOnly = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        children: PropTypes.node,
        projectId: PropTypes.string,
        userId: PropTypes.string
    },

    componentDidMount() {
        const { projectId, userId } = this.props;
        this.statusRef = ref(`groups/${projectId}/${userId}/status`);
        this.statusRef.on('value', this.handleSnap);
    },

    componentWillUnmount() {
        this.statusRef.off('value', this.handleSnap);
    },

    handleSnap(snap) {
        const status = snap.val();
        const isMember = status === 'owner' || status === 'member';
        console.log('isMember:', isMember);

        if (!isMember) {
            this.context.router.replace('/projects');
        }
    },

    render() {
        return this.props.children;
    }

});

export default ProjectMembersOnly;
