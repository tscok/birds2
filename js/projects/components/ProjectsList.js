import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { List, Spinner } from 'js/core/components';
import ProjectsItem from './ProjectsItem';

import { update } from 'js/redux/components/projects/actions';


const block = purebem.of('projects-list');

const ProjectsList = React.createClass({

    propTypes: {
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        // ...
        list: PropTypes.array,
        loading: PropTypes.bool,
        onUpdate: PropTypes.func
    },

    componentDidMount() {
        const path = `users/${this.props.uid}/projects`;
        this.projectsRef = firebase.database().ref(path);
        this.projectsRef.on('value', this.handleSnap);
    },

    componentWillUnmount() {
        this.projectsRef.off('value', this.handleSnap);
    },

    handleSnap(snap) {
        const promises = [];

        snap.forEach(childSnap => {
            promises.push(this.getProject(childSnap.key));
        });

        Promise.all(promises).then(data => {
            this.props.onUpdate(data);
        });
    },

    getProject(id) {
        return new Promise(resolve => {
            firebase.database().ref(`projects/${id}`).on('value', (snap) => {
                resolve(snap.val());
            });
        });
    },

    render() {
        if (this.props.loading) {
            return (<Spinner />);
        }

        return (
            <div className={ block() }>
                <List
                    list={ this.props.list }
                    item={ ProjectsItem } />
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        list: component.list,
        loading: component.loading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdate: (list) => dispatch(update({
            root: props.root,
            list
        }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
