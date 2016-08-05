import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { ButtonToggle, FormGroup, InputField, ViewHeader } from 'app/components';


const block = purebem.of('project-entry-view');

const ProjectEntryView = React.createClass({

    propTypes: {

    },

    handleInput(evt) {
        console.log('input', evt.target.value);
    },

    handleToggle() {
        console.log('toggle');
    },

    renderForm() {
        return (
            <div className={ block('form') }>
                <ButtonToggle
                    active="New Ring"
                    center={ true }
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
                        active="1.0"
                        onClick={ this.handleToggle }
                        options={ ['1.0', '2.0', '2+', '3+'] } />
                </FormGroup>
                <FormGroup label="Sex">
                    <ButtonToggle
                        active="F"
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEntryView);
