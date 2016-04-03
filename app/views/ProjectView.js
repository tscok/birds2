import React, { PropTypes } from 'react';
import purebem from 'purebem';
import promise from 'promise';
import moment from 'moment';

import firebaseRef from 'app/firebaseRef';

import { getStatus } from 'app/utils';

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
            isLoading: true,
            project: {}
        };
    },

    componentWillMount() {
        const uid = firebaseRef.getAuth().uid;
        const pid = this.props.params.id;

        this.membersRef = firebaseRef.child(`members/${pid}/active/${uid}`);
        this.projectRef = firebaseRef.child(`projects/${this.props.params.id}`);

        this.memberAuth().then(() => {
            this.projectRef.once('value', (snap) => {
                this.setState({ project: snap.val(), isLoading: false });
            });
        });
    },

    memberAuth() {
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

    renderStatus() {
        if (this.state.isLoading) {
            return <Spinner />
        }

        const { title, start, end } = this.state.project;
        const status = getStatus(start, end).toLowerCase();

        let statusText;

        switch (status) {
            case 'active':
                statusText = (<p>This project will end { moment.unix(end).format('MMMM D, YYYY') }.</p>);
                break;
            case 'pending':
                statusText = (<p>This project will start { moment.unix(start).format('MMMM D, YYYY') }.</p>);
                break;
            default:
                statusText = (<p>This project ended { moment.unix(end).format('MMMM D, YYYY') }.</p>);
        };

        return (
            <div className={ block('status') }>
                <div className={ block('title') }>{ title }</div>
                <div className={ block('body', { status }) }>{ statusText }</div>
            </div>
        );
    },

    renderCharts() {
        return (
            <div className={ block('charts')}>
                <div className={ block('chart') }></div>
                <div className={ block('chart') }></div>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <div className="container">
                    { this.renderStatus() }
                    { this.renderCharts() }
                </div>
            </div>
        );
    }

});

export default ProjectView;
