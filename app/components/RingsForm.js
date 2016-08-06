import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { isString } from 'app/utils';
import { filter } from 'app/lodash';
import { Autocomplete, Button, FormGroup, InputField } from 'app/components';
import { ringsFormReset, ringsUpdate, ringsAutocompleteSelect } from 'app/redux/rings';


const block = purebem.of('rings-form');

const RingsForm = React.createClass({

    propTypes: {
        autocomplete: PropTypes.shape({
            expanded: PropTypes.bool,
            list: PropTypes.array
        }).isRequired,
        form: PropTypes.shape({
            size: PropTypes.string,
            serial: PropTypes.string
        }).isRequired,
        onAutocompleteUpdate: PropTypes.func.isRequired,
        onAutocompleteExpand: PropTypes.func.isRequired,
        onAutocompleteSelect: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        projectId: PropTypes.string.isRequired,
        sizes: PropTypes.array.isRequired
    },

    componentWillMount() {
        const { projectId } = this.props;
        this.ringsRef = firebase.database().ref(`rings/${projectId}`);
    },

    componentWillUnmount() {
        this.props.onReset();
    },

    getTrimmedValue(name, value) {
        switch (name) {
            case 'size':
                return value.trim().replace(',', '.');

            case 'serial':
                return value.trim().toUpperCase();
        }
    },

    getDecimalValue(value) {
        const pattern = /\.[0-9]+/;
        return pattern.test(value) ? value : `${value}.0`;
    },

    handleInput(evt) {
        const { name, value } = evt.target;
        const trimmedValue = this.getTrimmedValue(name, value);

        this.props.onInput(name, trimmedValue);

        if (name === 'size') {
            this.handleAutocomplete(value);
        }
    },

    handleAutocomplete(value) {
        const pattern = new RegExp(`^${value}`);
        const matches = filter(this.props.sizes, (o) => {
            return value && pattern.test(o.size);
        });

        this.props.onAutocompleteUpdate(matches);
    },

    handleSubmit(evt) {
        evt.preventDefault();
        const { form } = this.props;

        if (!isString(form.size) || !isString(form.serial)) {
            // display error message…
            return;
        }

        const size = this.getDecimalValue(form.size).replace('.', '_');
        this.ringsRef.child(`${size}`).update({ serial: form.serial });
        this.ringsRef.child(`${size}/history/${form.serial}`).set(true);
        this.props.onReset();
    },

    render() {
        const { autocomplete, form } = this.props;

        return (
            <form className={ block() } onSubmit={ this.handleSubmit }>
                <FormGroup
                    label="Ring Size"
                    type="inline">
                    <Autocomplete
                        name="size"
                        expanded={ autocomplete.expanded }
                        onChange={ this.handleInput }
                        onClick={ (value) => this.props.onInput('size', value) }
                        onExpand={ this.props.onAutocompleteExpand }
                        onSelect={ this.props.onAutocompleteSelect }
                        list={ autocomplete.list }
                        value={ form.size } />
                </FormGroup>
                <FormGroup
                    label="Serial No."
                    type="inline">
                    <InputField
                        name="serial"
                        onChange={ this.handleInput }
                        value={ form.serial } />
                </FormGroup>
                <FormGroup
                    label="&nbsp;"
                    type="inline">
                    <Button
                        style="success"
                        type="submit">Update</Button>
                </FormGroup>
            </form>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        autocomplete: state.rings.autocomplete,
        form: state.rings.form,
        sizes: state.rings.sizes.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInput: (name, value) => dispatch(ringsUpdate('form', { [name]: value })),
        onReset: () => dispatch(ringsFormReset()),
        onAutocompleteUpdate: (list) => dispatch(ringsUpdate('autocomplete', { list, expanded: !!list.length })),
        onAutocompleteExpand: (expanded) => dispatch(ringsUpdate('autocomplete', { expanded })),
        onAutocompleteSelect: (index) => dispatch(ringsAutocompleteSelect(index, { selected: true }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RingsForm);
