import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { joinUpdate } from 'app/redux/join';


const block = purebem.of('join-button');

const JoinButton = React.createClass({

    propTypes: {
        onUpdate: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        // ...
        button: PropTypes.object
    },

    componentWillMount() {
        const { project, user } = this.props;
        this.projectRef = firebase.database().ref(`users/${user.uid}/projects/${project.id}`);
        this.projectRef.on('value', this.handleSnap);
    },

    handleSnap(snap) {
        new Promise((resolve, reject) => {
            if (!snap.exists()) {
                resolve('n/a');
            }
            resolve(snap.val().role);
        }).then((role) => {
            const visible = role !== 'owner' && role !== 'member';

            this.props.onUpdate(snap.key, {
                loading: false,
                role,
                visible
            });
        });
    },

    handleClick() {
        const { button, project, user } = this.props;
        const data = button.role === 'pending' ? null : { role: 'pending' };

        firebase.database().ref(`users/${user.uid}/projects/${project.id}`).set(data);
        firebase.database().ref(`groups/${project.id}/${user.uid}`).set(data);
        this.props.onUpdate(project.id, { loading: true });
    },

    renderButton() {
        const { role } = this.props.button;
        const label = role === 'pending' ? 'Leave' : 'Join';
        const style = role === 'pending' ? 'outline' : 'primary';
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
        button: state.join[props.project.id],
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (pid, data) => dispatch(joinUpdate(pid, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinButton);
