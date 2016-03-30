import React, { PropTypes } from 'react';
import purebem from 'purebem';

import firebaseRef from 'app/firebaseRef';

import ContentBox from 'app/components/ContentBox';
import Spinner from 'app/components/Spinner';


const block = purebem.of('project-view');

const ProjectView = React.createClass({

    propTypes: {
        params: PropTypes.object
    },

    contextTypes: {
        router: PropTypes.object
    },

    getInitialState() {
        return {
            isLoading: true
        };
    },

    componentWillMount() {
        const uid = firebaseRef.getAuth().uid;
        const pid = this.props.params.id;

        this.validateMembership(pid, uid);

        firebaseRef.child(`projects/${this.props.params.id}`).once('value', (snap) => {
            this.setState({ project: snap.val(), isLoading: false });
        });
    },

    validateMembership(pid, uid) {
        firebaseRef.child(`memberships/${pid}/member/${uid}`).once('value', (snap) => {
            if (snap.val() !== true) {
                this.context.router.push('/profile');
            }
        });
    },

    renderProject() {
        if (this.state.isLoading) {
            return <Spinner />
        }

        console.log(this.state.project);

        return (
            <div className="container">
                <ContentBox title={ this.state.project.title } background="white" shadow={ true }>
                    <p>Test</p>
                </ContentBox>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderProject() }
            </div>
        );
    }

});

export default ProjectView;
