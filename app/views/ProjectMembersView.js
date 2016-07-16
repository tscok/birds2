import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { orderBy } from 'app/lodash';
import { memberUpdate, membersUpdate } from 'app/redux/members';
import { List, MemberListItem, Spinner, ViewHeader } from 'app/components';


const block = purebem.of('project-members-view');

const ProjectMembersView = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    propTypes: {
        loading: PropTypes.bool.isRequired,
        members: PropTypes.array.isRequired,
        onExpand: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        // ...
        params: PropTypes.object
    },

    componentWillMount() {
        const pid = this.props.params.id;
        firebase.database().ref(`groups/${pid}`).on('value', this.handleSnap);
    },

    handleSnap(snap) {
        const members = [];

        new Promise((resolve, reject) => {
            snap.forEach((childSnap) => {
                this.getMember(childSnap.key).then((data) => {
                    members.push({ uid: childSnap.key, ...childSnap.val(), ...data });
                    if (snap.numChildren() === members.length) {
                        resolve(members);
                    }
                });
            });
        }).then((members) => {
            this.props.onUpdate({ members, loading: false });
        });
    },

    handleExpand(uid, expanded=false) {
        console.log(uid, expanded);
        this.props.onExpand(uid, expanded);
    },

    getMember(uid) {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`users/${uid}/profile`).on('value', (snap) => {
                resolve(snap.val());
            });
        });
    },

    getListItemProps() {
        return {
            onExpand: this.handleExpand,
            projectId: this.props.params.id
        };
    },

    renderHeader() {
        return (
            <ViewHeader title="Members Manager">
                <p>Shows the project owner, members and users awaiting membership.</p>
            </ViewHeader>
        );
    },

    renderMembers() {
        const { members } = this.props;

        if (!members.length) {
            return (<Spinner />);
        }

        return (
            <List
                list={ orderBy(members, ['status']) }
                listItem={ MemberListItem }
                listItemProps={ this.getListItemProps() } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderHeader() }
                { this.renderMembers() }
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.members.loading,
        members: state.members.members
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdate: (data) => dispatch(membersUpdate(data)),
        onExpand: (uid, expanded) => dispatch(memberUpdate(uid, { expanded: !expanded }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMembersView);
