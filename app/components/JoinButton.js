import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { joinUpdate } from 'app/redux/join';


const block = purebem.of('join-button');

const JoinButton = React.createClass({

    propTypes: {
        onUpdate: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired,
        // ...
        button: PropTypes.object
    },

    componentWillMount() {
        const { projectId, user } = this.props;
        this.projectRef = firebase.database().ref(`users/${user.uid}/projects/${projectId}`);
        this.projectRef.on('value', this.handleSnap);
    },

    handleSnap(snap) {
        new Promise((resolve, reject) => {
            if (!snap.exists()) {
                resolve('n/a');
            }
            resolve(snap.val().status);
        }).then((status) => {
            const visible = status !== 'owner' && status !== 'member';

            this.props.onUpdate(snap.key, {
                loading: false,
                status,
                visible
            });
        });
    },

    handleClick() {
        const { button, projectId, user } = this.props;
        const data = button.status === 'pending' ? null : { status: 'pending' };

        firebase.database().ref(`users/${user.uid}/projects/${projectId}`).set(data);
        firebase.database().ref(`groups/${projectId}/${user.uid}`).set(data);
        this.props.onUpdate(projectId, { loading: true });
    },

    renderButton() {
        const { status } = this.props.button;
        const label = status === 'pending' ? 'Leave' : 'Join';
        const style = status === 'pending' ? 'outline' : 'primary';
        const classes = purebem.many(block('button'), `button-${style}`);

        return (
            <button type="button" className={ classes } onClick={ this.handleClick }>
                { label }
            </button>
        );
    },

    render() {
        const { button } = this.props;

        if (!button || button && !button.visible) {
            return null;
        }

        return (
            <div className={ block() }>
                { this.renderButton() }
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    return {
        button: state.join[props.projectId],
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (pid, data) => dispatch(joinUpdate(pid, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinButton);
