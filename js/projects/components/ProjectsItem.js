import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { capitalize } from 'js/utils';

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
        if (item.status === 'pending') {
            return;
        }
        this.context.router.push(`project/${item.id}`);
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
        const { status } = item;

        const created = this.getDateFromNow(timestamp);
        const due = this.getDateFromNow(expire);

        return (
            <div className={ block({ first, last, status }) } onClick={ () => this.onClick(item) }>
                <div className={ block('description') }>
                    <div className={ block('title') }>
                        { item.title }
                        { this.renderPendingCount() }
                    </div>
                    <div className={ block('meta') }>Created { created } by { item.owner }. Due { due }.</div>
                </div>
                <div className={ block('status', { status }) }>{ capitalize(status) }</div>
            </div>
        );
    }

});

export default ProjectsItem;
