import React, { PropTypes } from 'react';
import purebem from 'purebem';
import promise from 'promise';
import moment from 'moment';

import firebaseRef from 'app/firebaseRef';

import { getStatus } from 'app/utils';

import ContentBox from 'app/components/ContentBox';
import Spinner from 'app/components/Spinner';
import ViewHeader from 'app/components/ViewHeader';


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
        const { title, dateStart, dateEnd } = this.state.project;
        const status = getStatus(dateStart, dateEnd).toLowerCase();

        let body;

        switch (status) {
            case 'active':
                body = (<p>This project will end { moment.unix(dateEnd).format('MMMM D, YYYY') }.</p>);
                break;
            case 'pending':
                body = (<p>This project will start { moment.unix(dateStart).format('MMMM D, YYYY') }.</p>);
                break;
            default:
                body = (<p>This project ended { moment.unix(dateEnd).format('MMMM D, YYYY') }.</p>);
        };

        return (<ViewHeader title={ title }>{ body }</ViewHeader>);
    },

    renderCharts() {
        return (
            <div className={ block('charts')}>
                <div className="container">
                    <div className="one-third column">[chart]</div>
                    <div className="one-third column">[chart]</div>
                    <div className="one-third column">[chart]</div>
                </div>
            </div>
        );
    },

    render() {
        if (this.state.isLoading) {
            return <Spinner />
        }

        return (
            <div className={ block() }>
                { this.renderStatus() }
                { this.renderCharts() }
            </div>
        );
    }

});

export default ProjectView;
