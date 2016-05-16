import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { Avatar } from 'app/components';


const block = purebem.of('project-list-item');

const ProjectListItem = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        item: PropTypes.object.isRequired,
        pid: PropTypes.string.isRequired
    },

    handleClick(id) {
        this.context.router.push(`project/${id}`);
    },

    render() {
        const { item, pid } = this.props;

        return (
            <div className={ block() }>
                <div className={ block('column', ['left']) }>
                    <Avatar name={ item.title } />
                </div>
                <div className={ block('column', ['right']) }>
                    <span className={ block('title') } onClick={ () => this.handleClick(pid) }>{ item.title }</span>
                    <div className={ block('dates') }>{ item.dateStart } - { item.dateEnd }</div>
                </div>
            </div>
        );
    }

});

export default ProjectListItem;
