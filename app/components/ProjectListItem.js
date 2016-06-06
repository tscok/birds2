import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { Avatar, NavLink, PendingCount } from 'app/components';


const block = purebem.of('project-list-item');

const ProjectListItem = React.createClass({

    propTypes: {
        item: PropTypes.object.isRequired
    },

    renderTitle() {
        const { item } = this.props;

        if (item.role === 'pending') {
            return (
                <span className={ block('title') }>{ item.title }</span>
            );
        }

        return (
            <NavLink
                activeClass={ false }
                baseClass={ block('title', ['link']) }
                to={ `project/${item.pid}` }>
                { item.title }
            </NavLink>
        );
    },

    render() {
        const { item } = this.props;

        return (
            <div className={ block() }>
                <div className={ block('column', ['left']) }>
                    <Avatar name={ item.title } />
                    <PendingCount project={ item } />
                </div>
                <div className={ block('column', ['right']) }>
                    { this.renderTitle() }
                    <div className={ block('dates') }>{ item.dateStart } - { item.dateEnd }</div>
                </div>
            </div>
        );
    }

});

export default ProjectListItem;
