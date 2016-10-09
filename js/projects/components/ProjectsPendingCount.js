import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'js/firebase';

import { pending } from 'js/redux/components/projects/actions';


const block = purebem.of('projects-pending-count');

const ProjectsPendingCount = React.createClass({

    propTypes: {
        id: PropTypes.string.isRequired,
        onCount: PropTypes.func.isRequired,
        root: PropTypes.string.isRequired,
        // ...
        pending: PropTypes.object
    },

    getDefaultProps() {
        return {
            pending: {}
        };
    },

    componentDidMount() {
        this.pendingRef = firebase.database().ref(`groups/${this.props.id}`);
        this.pendingRef.orderByChild('status').equalTo('pending').on('value', this.handleSnap);
    },

    handleSnap(snap) {
        const count = snap.numChildren() || 0;
        this.props.onCount({ count });
    },

    render() {
        const { count } = this.props.pending;
        const show = count > 0;

        return (
            <div className={ block({ show }) } title="Number of join requests">{ count }</div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        pending: component.pending[props.id]
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCount: ({ count }) => dispatch(pending({ id: props.id, count }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPendingCount);
