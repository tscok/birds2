import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { Spinner } from 'app/components';

import { joinUpdate } from 'app/redux/join';
import { searchUpdate, resultUpdate } from 'app/redux/search';


const block = purebem.of('join-button');

const JoinButton = React.createClass({

    // propTypes: {
    //     index: PropTypes.number.isRequired,
    //     loading: PropTypes.bool.isRequired,
    //     onUpdate: PropTypes.func.isRequired,
    //     project: PropTypes.object.isRequired,
    //     user: PropTypes.shape({
    //         uid: PropTypes.string,
    //         name: PropTypes.string,
    //         email: PropTypes.string,
    //         photoURL: PropTypes.string
    //     }).isRequired,
    //     // ...
    //     role: PropTypes.string
    // },

    componentWillMount() {
        // console.log('button mounting');
        // const { project, user } = this.props;

        // console.log('button will mount', project);

        // this.memberRef = firebase.database().ref(`members/${project.pid}/${user.uid}/role`);

        // this.memberRef.on('value', (snap) => {
        //     console.log('role', snap.val());
        //     this.props.onUpdate(snap.val());
        // });
    },

    componentWillUnmount() {
        // this.memberRef.off('value');
    },

    componentDidMount() {
        // console.log(this.props);
    },

    isProjectOwner() {
        return this.props.user.uid === this.props.project.uid;
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

    renderStatus() {
        if (!this.props.project.role) {
            return null;
        }
        return (
            <span className={ block('status') }>{ this.props.project.role }</span>
        );
    },

    renderButton() {
        if (this.props.project.role) {
            return null;
        }
        return (
            <button type="button" className={ block('button') } onClick={ this.handleClick }>Join</button>
        );
    },

    render() {
        // if (this.isProjectOwner()) {
        //     return null;
        // }

        return (
            <div className={ block() }>[button]</div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdate: (role) => dispatch(resultUpdate(props.index, role))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinButton);
