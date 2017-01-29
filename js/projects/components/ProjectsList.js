import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';
import orderBy from 'lodash.orderby';

import { List, Spinner } from 'js/core/components';
import ProjectsEmpty from './ProjectsEmpty';
import ProjectsItem from './ProjectsItem';

// import { set } from 'js/redux/components/project/actions';
import { reset, update } from 'js/redux/components/projects/actions';


const block = purebem.of('projects-list');

const ProjectsList = React.createClass({

    propTypes: {
        onReset: PropTypes.func.isRequired,
        // onSelect: PropTypes.func.isRequired,
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
        this.props.onReset();
        this.projectsRef.off('value', this.handleSnap);
    },

    handleSnap(snap) {
        const promises = [];

        snap.forEach(childSnap => {
            const { status } = childSnap.val();
            promises.push(this.getProject(childSnap.key, status));
        });

        Promise.all(promises).then(data => {
            this.props.onUpdate(data);
        });
    },

    getProject(id, status) {
        return new Promise(resolve => {
            firebase.database().ref(`projects/${id}`).on('value', (snap) => {
                resolve({ ...snap.val(), status });
            });
        });
    },

    render() {
        if (this.props.loading) {
            return (<Spinner />);
        }

        if (this.props.empty) {
            return (<ProjectsEmpty />);
        }

        const listItemProps = {
            // onSelect: this.props.onSelect,
            root: this.props.root,
            uid: this.props.uid
        };

        return (
            <div className={ block() }>
                <h1>My Projects</h1>
                <List
                    item={ ProjectsItem }
                    itemProps={ listItemProps }
                    list={ orderBy(this.props.list, ['status']) } />
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        empty: !component.loading && !component.list.length,
        list: component.list,
        loading: component.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReset: () => dispatch(reset()),
        // onSelect: (project) => dispatch(set({ project })),
        onUpdate: (list) => dispatch(update({ list }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
