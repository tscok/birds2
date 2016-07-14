import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { pendingUpdate } from 'app/redux/pending';


const block = purebem.of('pending-count');

const PendingCount = React.createClass({

    propTypes: {
        count: PropTypes.number.isRequired,
        onUpdate: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired
    },

    componentWillMount() {
        const { project } = this.props;
        const groupsRef = firebase.database().ref(`groups/${project.id}`);
        groupsRef.orderByChild('role').equalTo('pending').on('value', this.handleSnap);
    },

    handleSnap(snap) {
        const count = snap.numChildren();
        this.props.onUpdate(snap.key, { count });
    },

    render() {
        const show = this.props.count > 0;
        return (
            <div className={ block() }>
                <div className={ block('count', { show }) }>
                    { this.props.count }
                </div>
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const data = state.pending[props.project.id];
    return {
        count: data ? data.count : 0
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (pid, data) => dispatch(pendingUpdate(pid, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingCount);
