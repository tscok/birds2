import React, { PropTypes } from 'react';
import purebem from 'purebem';

import { capitalize } from 'app/utils';
import { ListItem, MemberListItemForm } from 'app/components';


const block = purebem.of('member-list-item');

const MemberListItem = React.createClass({

    propTypes: {
        item: PropTypes.object.isRequired,
        onExpand: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired
    },

    handleAccept() {
        const { item, projectId } = this.props;
        firebase.database().ref(`users/${item.uid}/projects/${projectId}`).update({ status: 'member' });
        firebase.database().ref(`groups/${projectId}/${item.uid}`).update({ status: 'member' });
    },

    handleDecline() {
        const { item, projectId } = this.props;
        firebase.database().ref(`users/${item.uid}/projects/${projectId}`).update({ status: null });
        firebase.database().ref(`groups/${projectId}/${item.uid}`).update({ status: null });
    },

    handleRevoke() {
        const { item, projectId } = this.props;
        firebase.database().ref(`users/${item.uid}/projects/${projectId}`).update({ status: 'pending' });
        firebase.database().ref(`groups/${projectId}/${item.uid}`).update({ status: 'pending' });
    },

    handleExpand() {
        this.props.onExpand(this.props.item.uid, this.props.item.expanded);
    },

    renderPendingActions() {
        return (
            <div className={ block('actions') }>
                <button type="button" className={ purebem.many(block('button'), 'button-primary') } onClick={ this.handleAccept }>Approve</button>
                <button type="button" className={ purebem.many(block('button'), 'button-outline') } onClick={ this.handleDecline }>Decline</button>
            </div>
        );
    },

    renderMemberActions() {
        const label = this.props.item.expanded ? 'Collapse' : 'Expand';
        return (
            <div className={ block('actions') }>
                <button type="button" className={ purebem.many(block('button'), 'button-outline') } onClick={ this.handleExpand }>{ label }</button>
            </div>
        );
    },

    renderActions() {
        const { item } = this.props;
        if (item.status === 'pending') {
            return this.renderPendingActions();
        }
        return this.renderMemberActions();
    },

    renderExpanded() {
        if (!this.props.item.expanded) {
            return null;
        }
        return (<MemberListItemForm memberId={ this.props.item.uid } />);
    },

    render() {
        const { item } = this.props;
        return (
            <div className={ block() }>
                <ListItem
                    title={ item.name || item.email }
                    body={ `Status: ${capitalize(item.status)}` }
                    aside={ this.renderActions() }
                    modifier={ item.status }>
                    { this.renderExpanded() }
                </ListItem>
            </div>
        );
    }

});

export default MemberListItem;
