import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { filter } from 'app/lodash';


const block = purebem.of('pending-count');

const PendingCount = React.createClass({

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
            pending: 0
        };
    },

    componentWillMount() {
        const { pid } = this.props.project;
        firebase.database().ref(`members/${pid}`).on('value', (snap) => {
            const pending = filter(snap.val(), { 'role': 'pending' }).length;
            this.setState({ pending });
        });
    },

    render() {
        const { project, user } = this.props;

        if (project.uid !== user.uid || this.state.pending === 0) {
            return null;
        }

        return (
            <span className={ block() }>{ this.state.pending }</span>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(PendingCount);
