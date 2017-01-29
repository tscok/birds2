import React, { PropTypes } from 'react';

import { ref } from 'js/firebase';

import { Attach } from 'js/core/components';
import { initialize, terminate } from 'js/redux/components/project/actions';


const ProjectView = React.createClass({

    propTypes: {
        auth: PropTypes.object,
        root: PropTypes.string
    },

    render() {
        if (!this.props.auth.uid) {
            console.log('ProjectView, no ID', this.props.auth);
            return null;
        }

        console.log('ProjectView, w/ ID', this.props.auth);

        const { children, auth, root } = this.props;
        const childWithProps = React.cloneElement(children, { auth, root });

        return (
            <div>
                <h1>ProjectView</h1>
                { childWithProps }
            </div>
        );
    }
});

export default Attach(ProjectView, { initialize, root: 'project', terminate });
