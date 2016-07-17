import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { isString } from 'app/utils';
import { memberUpdate } from 'app/redux/members';
import { Button, ButtonToggle, InputField } from 'app/components';


const block = purebem.of('member-list-item-form');

const MemberListItemForm = React.createClass({

    propTypes: {
        member: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired
    },

    handleSave() {
        const { member, projectId } = this.props;
        firebase.database().ref(`groups/${projectId}/${member.uid}`)
            .update({
                role: member.role,
                sign: member.sign && member.role === 'ringer' ? member.sign : null
            });
    },

    handleToggle(role) {
        this.props.onToggle(role.toLowerCase());
    },

    handleInput(evt) {
        this.props.onInput(evt.target.value);
    },

    render() {
        const { member } = this.props;
        const roles = ['assistant', 'ringer'];

        return (
            <div className={ block() }>
                <div className={ block('toggle') }>
                    <ButtonToggle
                        active={ member.role }
                        className={ block('toggle') }
                        onClick={ this.handleToggle }
                        options={ roles } />
                </div>
                <div className={ block('input') }>
                    <InputField
                        disabled={ member.role === 'assistant' }
                        onChange={ this.handleInput }
                        placeholder="Ringer sign."
                        stretched={ true }
                        value={ member.sign } />
                </div>
                <div className={ block('save') }>
                    <Button onClick={ this.handleSave } style="neutral">Save</Button>
                    <Button onClick={ this.props.onClose }>Cancel</Button>
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
