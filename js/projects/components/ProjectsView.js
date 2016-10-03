import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import ProjectsList from './ProjectsList';

import attach from 'js/redux/components/attach';
import { initialize } from 'js/redux/components/projects/actions';


const block = purebem.of('projects-view');

const ProjectsView = React.createClass({

    propTypes: {
        auth: PropTypes.object.isRequired,
        root: PropTypes.string.isRequired
    },

    render() {
        if (!this.props.auth.uid) {
            return null;
        }

        return (
            <div className={ block() }>
                <ProjectsList
                    root={ this.props.root }
                    uid={ this.props.auth.uid } />
            </div>
        );
    }
});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        empty: !component.loading && component.list.length === 0,
    };
};

const ProjectsViewContainer = connect(mapStateToProps)(ProjectsView);

export default attach(ProjectsViewContainer, { initialize, root: 'projects' });
