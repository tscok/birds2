import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { Status } from 'js/core/components';

import ProjectsPendingCount from './ProjectsPendingCount';


const block = purebem.of('projects-item');

const ProjectsItem = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        first: PropTypes.bool.isRequired,
        item: PropTypes.object.isRequired,
        last: PropTypes.bool.isRequired,
        // ...
        // onSelect: PropTypes.func,
        root: PropTypes.string,
        uid: PropTypes.string
    },

    getDate(timestamp) {
        return moment.unix(timestamp);
    },

    getDateFromNow(timestamp) {
        return this.getDate(timestamp).fromNow();
    },

    onClick(item) {
        // this.props.onSelect(item);
        this.context.router.push(`project/${item.id}/dashboard`);
    },

    renderPendingCount() {
        if (this.props.item.ownerId !== this.props.uid) {
            return null;
        }

        return (
            <ProjectsPendingCount
                id={ this.props.item.id }
                root={ this.props.root } />
        );
    },

    render() {
        const { first, item, last } = this.props;
        const { expire, timestamp } = item.dates;
        const isPending = item.status === 'pending';

        const created = this.getDateFromNow(timestamp);
        const due = this.getDateFromNow(expire);

        return (
            <div
                className={ block({ first, last, status: item.status }) }
                onClick={ () => !isPending && this.onClick(item) }>
                <div className={ block('description') }>
                    <div className={ block('title') }>
                        { item.title }
                        { this.renderPendingCount() }
                    </div>
                    <div className={ block('meta') }>Created { created } by { item.owner }. Due { due }.</div>
                </div>
                <div className={ block('status') }>
                    <Status status={ item.status } />
                </div>
            </div>
        );
    }

});

export default ProjectsItem;
