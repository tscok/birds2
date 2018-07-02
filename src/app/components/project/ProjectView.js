import React, { PropTypes } from 'react';

import ProjectMembersOnly from './ProjectMembersOnly';

import { Attach } from 'src/core/components';
import { initialize, terminate } from 'src/redux/components/project/actions';


const ProjectView = React.createClass({

    propTypes: {
        // app
        auth: PropTypes.object,
        // router
        children: PropTypes.node,
        params: PropTypes.object,
        // attach
        root: PropTypes.string
    },

    render() {
        if (!this.props.auth.uid) {
            // Loader (if any) goes here...
            return null;
        }

        const { auth, children, root, params } = this.props;
        const childWithProps = React.cloneElement(children, { auth, root });

        return (
            <ProjectMembersOnly
                projectId={ params.id }
                userId={ auth.uid }>
                { childWithProps }
            </ProjectMembersOnly>
        );
    }
});

export default Attach(ProjectView, { initialize, root: 'project', terminate });
