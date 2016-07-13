import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { map } from 'app/lodash';
import { List, ProjectListItem } from 'app/components';


const block = purebem.of('project-list');

const ProjectList = React.createClass({

    propTypes: {
        data: PropTypes.shape({
            member: PropTypes.array,
            owner: PropTypes.array,
            pending: PropTypes.array
        }).isRequired
    },

    renderList(list, name) {
        return (
            <List
                key={ name }
                list={ list }
                listItem={ ProjectListItem }
                type={ name } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                {
                    map(this.props.data, this.renderList)
                }
            </div>
        );
    }

});

export default ProjectList;
