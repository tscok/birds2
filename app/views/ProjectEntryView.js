import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { ButtonToggle, FormGroup, InputField, ViewHeader } from 'app/components';

import { entryUpdate } from 'app/redux/entry';


const block = purebem.of('project-entry-view');

const ProjectEntryView = React.createClass({

    propTypes: {
        form: PropTypes.shape({
            age: PropTypes.string,
            sex: PropTypes.string
        }).isRequired,
        type: PropTypes.string.isRequired
    },

    handleInput(evt) {
        console.log('input', evt.target.value);
    },

    handleToggle(name, option) {
        switch (name) {
            case 'type':
                this.props.onType(option);
                break;

            default:
                this.props.onUpdate({ [name]: option });
        }
    },

    renderForm() {
        const { form, type } = this.props;

        return (
            <div className={ block('form') }>
                <ButtonToggle
                    active={ type }
                    center={ true }
                    name="type"
                    onClick={ this.handleToggle }
                    options={ ['New Ring', 'Old Ring'] } />
                <FormGroup label="Ring Size / ID">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Species">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
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
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Fat">
                    <InputField onChange={ this.handleInput } />
                </FormGroup>
                <FormGroup label="Sign.">
                    <InputField onChange={ this.handleInput } />
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
                <ViewHeader title="New Entry" />
                { this.renderForm() }
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        form: state.entry.form,
        type: state.entry.meta.type
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onType: (type) => dispatch(entryUpdate('meta', { type })),
        onUpdate: (data) => dispatch(entryUpdate('form', data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEntryView);
