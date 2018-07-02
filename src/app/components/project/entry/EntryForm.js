import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import {
    Button,
    FormGroup,
    RadioButtonGroup,
    TextboxContainer,
    ToggleContainer
} from 'src/core/components';

import { getComponent } from 'src/redux/utils';


const block = purebem.of('project-entry');

const EntryForm = React.createClass({

    propTypes: {
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        // redux
        isControl: PropTypes.bool.isRequired,
        isNewRing: PropTypes.bool.isRequired
    },

    renderRingId() {
        if (this.props.isNewRing) {
            return null;
        }
        return (
            <FormGroup
                label="Ring ID">
                <TextboxContainer
                    path="entry.form.ringId"
                    root={ this.props.root }
                    stretched={ true } />
            </FormGroup>
        );
    },

    renderRingSizeAndNumber() {
        if (this.props.isControl) {
            return null;
        }
        return (
            <div className={ block('columns') }>
                <div className={ block('column') }>
                    <FormGroup
                        label="Ring size">
                        <TextboxContainer
                            path="entry.form.ringSize"
                            root={ this.props.root }
                            stretched={ true } />
                    </FormGroup>
                </div>
                <div className={ block('column') }>
                    <FormGroup
                        label="Ring number">
                        <TextboxContainer
                            path="entry.form.ringNo"
                            root={ this.props.root }
                            stretched={ true } />
                    </FormGroup>
                </div>
            </div>
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderRingId() }
                <FormGroup
                    label="Species">
                    <TextboxContainer
                        path="entry.form.species"
                        root={ this.props.root }
                        stretched={ true } />
                </FormGroup>
                { this.renderRingSizeAndNumber() }
                <div className={ block('columns') }>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Net">
                            <TextboxContainer
                                path="entry.form.net"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Age">
                            <RadioButtonGroup
                                path="entry.form.age"
                                root={ this.props.root } />
                        </FormGroup>
                    </div>
                </div>
                <div className={ block('columns') }>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Sex">
                            <TextboxContainer
                                path="entry.form.sex"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                    <div className={ block('column') }>
                        <FormGroup
                            label="PJM">
                            <TextboxContainer
                                path="entry.form.pjm"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                </div>
                <div className={ block('columns') }>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Fat">
                            <TextboxContainer
                                path="entry.form.fat"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Signature">
                            <TextboxContainer
                                path="entry.form.sign"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                </div>
                <div className={ block('columns') }>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Weight">
                            <TextboxContainer
                                path="entry.form.weight"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Wing length">
                            <TextboxContainer
                                path="entry.form.wing"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                </div>
                <div className={ block('columns') }>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Hand">
                            <TextboxContainer
                                path="entry.form.hand"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                    <div className={ block('column') }>
                        <FormGroup
                            label="Arm">
                            <TextboxContainer
                                path="entry.form.arm"
                                root={ this.props.root }
                                stretched={ true } />
                        </FormGroup>
                    </div>
                </div>
                <FormGroup
                    label="Comment">
                    <textarea />
                </FormGroup>
                <div className={ block('buttons') }>
                    <Button
                        color="green"
                        inline={ true }
                        submit={ true }
                        text="Save" />
                    <Button
                        inline={ true }
                        text="Reset" />
                </div>
            </div>
        );
    }
});

const mapStateToProps = (state, props) => {
    const component = getComponent(state.components, props);
    return {
        isNewRing: component.tabs.new.active,
        isControl: component.tabs.old.active
    };
};

export default connect(mapStateToProps)(EntryForm);
