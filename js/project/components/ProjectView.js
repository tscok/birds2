import React, { PropTypes } from 'react';

import ProjectMembersOnly from './ProjectMembersOnly';

import { Attach } from 'js/core/components';
import { initialize, terminate } from 'js/redux/components/project/actions';


const ProjectView = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        children: PropTypes.node,
        params: PropTypes.object,
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
                <div>
                    <h1>ProjectView</h1>
                    { childWithProps }
                </div>
            </ProjectMembersOnly>
        );
    }
});

export default Attach(ProjectView, { initialize, root: 'project', terminate });
