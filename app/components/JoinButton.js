import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { Spinner } from 'app/components';


const block = purebem.of('join-button');

const JoinButton = React.createClass({

    propTypes: {
        project: PropTypes.object.isRequired,
        user: PropTypes.shape({
            uid: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            photoURL: PropTypes.string
        }).isRequired
    },

    getInitialState() {
        return {
            isLoading: true,
            role: null
        };
    },

    componentWillMount() {
        const { project, user } = this.props;
        this.memberRef = firebase.database().ref(`members/${project.pid}/${user.uid}/role`);
        this.memberRef.on('value', (snap) => {
            this.setState({ role: snap.val(), isLoading: false });
        });
    },

    componentWillUnmount() {
        this.memberRef.off('value');
    },

    handleClick() {
        const { project, user } = this.props;
        const userData = {
            ...user,
            role: 'pending'
        };
        const projectData = {
            ...project,
            role: 'pending'
        }

        firebase.database().ref(`members/${project.pid}/${user.uid}`).set(userData);
        firebase.database().ref(`users/${user.uid}/projects/${project.pid}`).set(projectData);
    },

    render() {
        if (this.props.user.uid === this.props.project.uid) {
            return null;
        }

        if (this.state.isLoading) {
            return (
                <span className={ block('spinner') }>
                    <Spinner type="circle" />
                </span>
            );
        }

        if (this.state.role) {
            return (
                <span className={ block('status') }>{ this.state.role }</span>
            );
        }

        return (
            <button type="button" className={ block('button') } onClick={ this.handleClick }>Join</button>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(JoinButton);