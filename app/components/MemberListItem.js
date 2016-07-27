import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { capitalize } from 'app/utils';
import { Button, ListItem, MemberListItemForm } from 'app/components';


const block = purebem.of('member-list-item');

const MemberListItem = React.createClass({

    propTypes: {
        isOwner: PropTypes.bool.isRequired,
        item: PropTypes.object.isRequired,
        onExpand: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired
    },

    handleUserUpdate(data) {
        const { item, projectId } = this.props;
        firebase.database().ref(`users/${item.uid}/projects/${projectId}`).update(data);
    },

    handleMemberUpdate(data) {
        const { item, projectId } = this.props;
        firebase.database().ref(`groups/${projectId}/${item.uid}`).update(data);
    },

    handleAccept() {
        this.handleUserUpdate({ status: 'member' });
        this.handleMemberUpdate({ status: 'member', role: 'assistant' });
    },

    handleDecline() {
        this.handleUserUpdate({ status: null });
        this.handleMemberUpdate({ status: null });
    },

    handleRevoke() {
        this.handleUserUpdate({ status: 'pending' });
        this.handleMemberUpdate({ status: 'pending', role: null, sign: null });
    },

    handleExpand() {
        this.props.onExpand(this.props.item.uid, this.props.item.expanded);
    },

    renderPendingActions() {
        if (this.props.item.status !== 'pending') {
            return null;
        }
        return (
            <div>
                <Button onClick={ this.handleAccept } style="success">Accept</Button>
                <Button onClick={ this.handleDecline }>Deny</Button>
            </div>
        );
    },

    renderMemberActions() {
        const { item } = this.props;
        if (item.expanded || item.status === 'pending') {
            return null;
        }
        return (<Button onClick={ this.handleExpand }>Edit</Button>);
    },

    renderActions() {
        return (
            <div className={ block('actions') }>
                { this.renderPendingActions() }
                { this.renderMemberActions() }
            </div>
        );
    },

    renderBody() {
        const { item } = this.props;
        const role = item.role ? `, ${capitalize(item.role)}` : '';
        const sign = item.sign ? `(${item.sign})` : '';

        if (item.expanded) {
            return null;
        }

        return (
            <div>
                <span>{ capitalize(item.status) }</span>
                <span>{ role } { sign }</span>
            </div>
        );
    },

    renderExpanded() {
        if (!this.props.item.expanded) {
            return null;
        }
        return (
            <MemberListItemForm
                member={ this.props.item }
                onClose={ this.handleExpand }
                onRevoke={ this.handleRevoke }
                projectId={ this.props.projectId } />
        );
    },

    render() {
        const { item } = this.props;

        return (
            <ListItem
                title={ item.name || item.email }
                body={ this.renderBody() }
                aside={ this.renderActions() }
                modifier={ item.status }>
                { this.renderExpanded() }
            </ListItem>
        );
    }

});

export default MemberListItem;
