import React, { PropTypes } from 'react';
import purebem from 'purebem';
import moment from 'moment';

import { capitalize } from 'app/utils';
import { ListItem, PendingCount } from 'app/components';


const block = purebem.of('project-list-item');

const ProjectListItem = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        item: PropTypes.object.isRequired
    },

    handleClick() {
        const { item } = this.props;
        if (item.status === 'pending') {
            return;
        }
        this.context.router.push(`project/${item.id}`);
    },

    getOwner() {
        const { item } = this.props;
        const owner = item.status === 'owner' ? 'you' : item.owner;
        return (<strong>{ owner }</strong>);
    },

    renderPendingCount() {
        if (this.props.item.status !== 'owner') {
            return null;
        }
        return (<PendingCount projectId={ this.props.item.id } />);
    },

    renderTitle() {
        return (
            <div>
                { this.props.item.title }
                { this.renderPendingCount() }
            </div>
        );
    },

    renderBody() {
        const day = moment.unix(this.props.item.dates.timestamp);
        const date = day.format('MMMM Do, YYYY');
        return (
            <div>Created by { this.getOwner() } on { date }</div>
        );
    },

    renderAside() {
        const { status } = this.props.item;
        return (
            <div className={ block('status', { status }) }>
                { capitalize(status) }
            </div>
        );
    },

    render() {
        const status = this.props.item.status;
        return (
            <ListItem
                title={ this.renderTitle() }
                body={ this.renderBody() }
                aside={ this.renderAside() }
                className={ block({ status }) }
                modifier={ status }
                onClick={ this.handleClick } />
        );
    }

});

export default ProjectListItem;
