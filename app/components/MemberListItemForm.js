import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { isString, capitalize } from 'app/utils';
import { isEqual } from 'app/lodash';
import { memberUpdate } from 'app/redux/members';
import { Button, ButtonToggle, InputField, FormGroup } from 'app/components';


const block = purebem.of('member-list-item-form');

const MemberListItemForm = React.createClass({

    propTypes: {
        member: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onRevoke: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            initialMember: this.props.member
        };
    },

    isRinger() {
        const { member } = this.props;
        return isString(member.sign) && member.role === 'ringer';
    },

    handleInput(evt) {
        const value = evt.target.value.trim().toUpperCase();
        this.props.onInput(value);
    },

    handleCancel() {
        const { initialMember } = this.state;
        this.props.onToggle(initialMember.role);
        this.props.onInput(initialMember.sign || null);
        this.props.onClose();
    },

    handleSave() {
        const { initialMember } = this.state;
        const { member } = this.props;

        if (!isEqual(initialMember, member)) {
            this.handleUpdate();
        }

        this.props.onClose();
    },

    handleToggle(name, option) {
        if (option === 'assistant') {
            this.props.onInput('');
        }
        this.props.onToggle(option);
    },

    handleUpdate() {
        const { member, projectId } = this.props;

        firebase.database().ref(`groups/${projectId}/${member.uid}`)
            .update({
                role: this.isRinger() ? 'ringer' : 'assistant',
                sign: this.isRinger() ? member.sign : null
            });
    },

    renderRevoke() {
        if (this.props.member.status === 'owner') {
            return null;
        }
        return (
            <Button onClick={ this.props.onRevoke } style="danger">Remove</Button>
        );
    },

    render() {
        const { member } = this.props;
        const isDisabled = !isString(member.sign) && member.role === 'ringer';

        return (
            <div className={ block() }>
                <div className={ block('form-input') }>
                    <FormGroup
                        className={ block('role') }
                        label="Role"
                        type="inline">
                        <ButtonToggle
                            active={ member.role }
                            className={ block('toggle') }
                            name="role"
                            onClick={ this.handleToggle }
                            options={ ['assistant', 'ringer'] } />
                    </FormGroup>
                    <FormGroup
                        className={ block('sign') }
                        label="Signature"
                        type="inline">
                        <InputField
                            disabled={ member.role !== 'ringer' }
                            onChange={ this.handleInput }
                            placeholder="e.g., 'MCN'"
                            value={ member.sign } />
                    </FormGroup>
                </div>
                <div className={ block('form-actions') }>
                    <Button
                        disabled={ isDisabled }
                        onClick={ this.handleSave }
                        style="neutral">Save</Button>
                    { this.renderRevoke() }
                    <Button onClick={ this.handleCancel }>Cancel</Button>
                </div>
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggle: (role) => dispatch(memberUpdate(props.member.uid, { role })),
        onInput: (sign) => dispatch(memberUpdate(props.member.uid, { sign }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberListItemForm);
