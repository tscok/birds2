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

    handleAccept() {
        const { item, projectId } = this.props;
        firebase.database().ref(`users/${item.uid}/projects/${projectId}`).update({ status: 'member' });
        firebase.database().ref(`groups/${projectId}/${item.uid}`).update({ status: 'member', role: 'assistant' });
    },

    handleDecline() {
        const { item, projectId } = this.props;
        firebase.database().ref(`users/${item.uid}/projects/${projectId}`).update({ status: null });
        firebase.database().ref(`groups/${projectId}/${item.uid}`).update({ status: null });
    },

    handleRevoke() {
        const { item, projectId } = this.props;
        firebase.database().ref(`users/${item.uid}/projects/${projectId}`).update({ status: 'pending' });
        firebase.database().ref(`groups/${projectId}/${item.uid}`).update({ status: 'pending', role: null, sign: null });
    },

    handleExpand() {
        this.props.onExpand(this.props.item.uid, this.props.item.expanded);
    },

    renderPendingActions() {
        return (
            <div className={ block('actions') }>
                <Button onClick={ this.handleAccept } style="success">Accept</Button>
                <Button onClick={ this.handleDecline }>Deny</Button>
            </div>
        );
    },

    renderRevoke() {
        if (this.props.item.status === 'owner') {
            return null;
        }
        return (<Button onClick={ this.handleRevoke }>Revoke</Button>);
    },

    renderMemberActions() {
        if (this.props.item.expanded) {
            return null;
        }
        return (
            <div className={ block('actions') }>
                <Button onClick={ this.handleExpand }>Edit</Button>
                { this.renderRevoke() }
            </div>
        );
    },

    renderActions() {
        if (!this.props.isOwner) {
            return null;
        }
        if (this.props.item.status === 'pending') {
            return this.renderPendingActions();
        }
        return this.renderMemberActions();
    },

    renderSummary(item) {
        if (item.expanded) {
            return null;
        }
        return (
            <div>
                <div><strong>Role:</strong> { item.role ? capitalize(item.role) : '' }</div>
                <div><strong>Sign:</strong> { item.sign ? item.sign : '' }</div>
            </div>
        );
    },

    renderBody() {
        const { item } = this.props;
        return (
            <div>
                <div><strong>Status:</strong> { capitalize(item.status) }</div>
                { this.renderSummary(item) }
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
                projectId={ this.props.projectId } />
        );
    },

    render() {
        const { item } = this.props;
        return (
            <div className={ block() }>
                <ListItem
                    title={ item.name || item.email }
                    body={ this.renderBody() }
                    aside={ this.renderActions() }
                    modifier={ item.status }>
                    { this.renderExpanded() }
                </ListItem>
            </div>
        );
    }

});

export default MemberListItem;
