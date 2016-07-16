import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { isString } from 'app/utils';
import { memberUpdate } from 'app/redux/members';
import { ButtonToggle, InputField } from 'app/components';


const block = purebem.of('member-list-item-form');

const MemberListItemForm = React.createClass({

    propTypes: {
        member: PropTypes.object.isRequired,
        onInput: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired
    },

    handleSave() {
        const { member, projectId } = this.props;
        firebase.database().ref(`groups/${projectId}/${member.uid}`)
            .update({
                role: member.role,
                sign: member.sign || null
            });
    },

    handleToggle(role) {
        this.props.onToggle(role);
    },

    handleInput(evt) {
        this.props.onInput(evt.target.value);
    },

    renderInput() {
        const { member } = this.props;
        return (
            <InputField
                disabled={ member.role === 'assistant' }
                onChange={ this.handleInput }
                placeholder="Signature, e.g. MCN"
                value={ member.sign } />
        );
    },

    render() {
        const roles = ['assistant', 'ringer'];

        return (
            <div className={ block() }>
                <ButtonToggle
                    active={ this.props.member.role }
                    className={ block('toggle') }
                    onClick={ this.handleToggle }
                    options={ roles } />
                { this.renderInput() }
                <button type="button" className="button-outline" onClick={ this.handleSave }>Save</button>
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
