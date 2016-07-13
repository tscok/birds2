import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { Spinner } from 'app/components';


const block = purebem.of('join-button');

const JoinButton = React.createClass({

    propTypes: {
        project: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true
        };
    },

    componentWillMount() {
        const { project, user } = this.props;
        this.projectRef = firebase.database().ref(`users/${user.uid}/projects/${project.id}`);
        this.projectRef.on('value', this.handleSnap);
    },

    handleSnap(snap) {
        if (!snap.exists()) {
            this.setState({ loading: false });
            return;
        }
        
        const { role } = snap.val();
        console.log(role);
    },

    handleJoin() {
        console.log('request to join');
    },

    handleCancel() {
        console.log('cancel request');
    },

    isOwnProject() {
        const { project, user } = this.props;
        return project.ownerId === user.uid;
    },

    renderButton() {
        if (this.state.loading) {
            return null;
        }

        const classNames = purebem.many(block('button'), 'button-primary');

        return (
            <button type="button" className={ classNames } onClick={ this.handleClick }>Join</button>
        );
    },

    renderSpinner() {
        if (!this.state.loading) {
            return null;
        }
        return (
            <Spinner type="circle" />
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderSpinner() }
                { this.renderButton() }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(JoinButton);
