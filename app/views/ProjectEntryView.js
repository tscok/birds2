import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { filter, map } from 'app/lodash';
import { ButtonToggle, Dropdown, FormGroup, InputField, InputRange, ViewHeader } from 'app/components';

import { entryUpdate } from 'app/redux/entry';


const block = purebem.of('project-entry-view');

const ProjectEntryView = React.createClass({

    propTypes: {
        form: PropTypes.shape({
            age: PropTypes.string,
            sex: PropTypes.string
        }).isRequired,
        meta: PropTypes.shape({
            type: PropTypes.string,
            signs: PropTypes.array
        }).isRequired
    },

    componentWillMount() {
        const projectId = this.props.params.id;
        firebase.database().ref(`groups/${projectId}`).on('value', this.handleSnap);
    },

    handleSnap(snap) {
        const signs = filter(map(snap.val(), 'sign'));
        this.props.onMetaUpdate({ signs });
    },

    handleInput(evt) {
        const { name, value } = evt.target;
        this.props.onFormUpdate({ [name]: value });
    },

    handleToggle(name, option) {
        switch (name) {
            case 'type':
                this.props.onMetaUpdate({ type: option });
                break;

            default:
                this.props.onFormUpdate({ [name]: option });
        }
    },

    renderRingId() {
        if (this.props.meta.type === 'New Ring') {
            return null;
        }
        return (
            <FormGroup label="Ring ID">
                <InputField name="id" onChange={ this.handleInput } />
            </FormGroup>
        );
    },

    renderRingSize() {
        if (this.props.meta.type === 'Old Ring') {
            return null;
        }
        return (
            <FormGroup label="Ring No.">
                <InputRange
                    name="ring"
                    onChange={ this.handleInput }
                    value={ this.props.form.ring } />
            </FormGroup>
        );
    },

    renderForm() {
        const { form, meta } = this.props;

        return (
            <div className={ block('form') }>
                { this.renderRingId() }
                <FormGroup label="Species">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                { this.renderRingSize() }
                <FormGroup label="Net">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Age">
                    <ButtonToggle
                        active={ form.age }
                        name="age"
                        onClick={ this.handleToggle }
                        options={ ['1.0', '2.0', '2+', '3+'] } />
                </FormGroup>
                <FormGroup label="Sex">
                    <ButtonToggle
                        active={ form.sex }
                        name="sex"
                        onClick={ this.handleToggle }
                        options={ ['F', 'M'] } />
                </FormGroup>
                <FormGroup label="PJM">
                    <InputRange
                        max="6"
                        min="0"
                        name="pjm"
                        onChange={ this.handleInput }
                        value={ form.pjm } />
                </FormGroup>
                <FormGroup label="Fat">
                    <InputRange
                        max="10"
                        min="0"
                        name="fat"
                        onChange={ this.handleInput }
                        value={ form.fat } />
                </FormGroup>
                <FormGroup label="Sign.">
                    <Dropdown
                        name="sign"
                        options={ meta.signs } />
                </FormGroup>
                <FormGroup label="Weight">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Wing length">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Hand">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Arm">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Comments">
                    <textarea />
                </FormGroup>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="New Entry">
                    <ButtonToggle
                        active={ this.props.meta.type }
                        center={ true }
                        name="type"
                        onClick={ this.handleToggle }
                        options={ ['New Ring', 'Old Ring'] } />
                </ViewHeader>

                { this.renderForm() }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    console.log(state.entry.meta);
    return {
        form: state.entry.form,
        meta: state.entry.meta
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFormUpdate: (data) => dispatch(entryUpdate('form', data)),
        onMetaUpdate: (data) => dispatch(entryUpdate('meta', data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEntryView);
