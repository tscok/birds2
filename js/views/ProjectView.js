import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { Spinner, ViewHeader } from 'app/components';
import { projectReset, projectUpdate } from 'app/redux/project';


const block = purebem.of('project-view');

const ProjectView = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        isLoading: PropTypes.bool.isRequired,
        onReset: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        // ...
        project: PropTypes.object,
        params: PropTypes.object,
        uid: PropTypes.string
    },

    componentWillMount() {
        const pid = this.props.params.id;

        firebase.database().ref(`projects/${pid}`).once('value', (snap) => {
            this.props.onUpdate({ project: snap.val(), isLoading: false });
        });
    },

    componentWillUnmount() {
        this.props.onReset();
    },

    render() {
        if (this.props.isLoading) {
            return <Spinner />
        }

        return (
            <div className={ block() }>
                { this.props.project.title }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        isLoading: state.project.isLoading,
        project: state.project.project,
        uid: state.user.uid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(projectReset()),
        onUpdate: (data) => dispatch(projectUpdate(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
