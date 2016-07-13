import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { NavLink, PendingCount } from 'app/components';


const block = purebem.of('project-list-item');

const ProjectListItem = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        item: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    },

    handleClick() {
        this.context.router.push(`project/${this.props.item.id}`);
    },

    getOwner() {
        const { item, type } = this.props;
        const owner = type === 'owner' ? 'you' : item.owner;

        return (
            <span className={ block('owner') }>{ owner }</span>
        );
    },

    render() {
        const { item, type } = this.props;
        const day = moment.unix(item.dates.timestamp);
        const date = day.format('MMMM Do, YYYY');

        return (
            <div className={ block() } onClick={ this.handleClick }>
                <div className={ block('title', { type }) }>
                    { item.title }
                </div>
                <div className={ block('body') }>
                    Created by { this.getOwner() } on { date }
                </div>
            </div>
        );
    }

});

export default ProjectListItem;
