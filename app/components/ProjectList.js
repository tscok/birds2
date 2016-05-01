import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import {
    ContentBox,
    Table
} from 'app/components';


const block = purebem.of('project-list');

const ProjectList = React.createClass({

    propTypes: {
        projects: PropTypes.array.isRequired,
        userId: PropTypes.string.isRequired
    },

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    handleClick(id) {
        this.context.router.push(`project/${id}`);
    },

    render() {
        if (!this.props.projects.length) {
            return null;
        }

        const headers = ['avatar', 'title', 'ownerId', 'status'];

        return (
            <div className={ block() }>
                <div className="container">
                    <ContentBox title="Projects">
                        <Table
                            data={ this.props.projects }
                            headers={ headers }
                            onClick={ this.handleClick } />
                    </ContentBox>
                </div>
            </div>
        );
    }

});

export default ProjectList;
