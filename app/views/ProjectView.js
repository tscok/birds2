import React, { PropTypes } from 'react';
import purebem from 'purebem';
import promise from 'promise';

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

        this.membersRef = firebaseRef.child(`members/${pid}/active/${uid}`);
        this.projectRef = firebaseRef.child(`projects/${this.props.params.id}`);

        this.userAuth().then(() => {
            this.projectRef.once('value', (snap) => {
                this.setState({ project: snap.val(), isLoading: false });
            });
        });
    },

    userAuth() {
        return new promise((resolve, reject) => {
            this.membersRef.once('value', (snap) => {
                if (!snap.exists()) {
                    this.context.router.push('/profile');
                    return;
                }
                resolve();
            });
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
