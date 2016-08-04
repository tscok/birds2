import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { isString } from 'app/utils';
import { filter, map } from 'app/lodash';
import { Autocomplete, Button, FormGroup, InputField, RingsList, Spinner, ViewHeader } from 'app/components';
import { ringsItemExpand, ringsFormReset, ringsUpdate, ringsAutocompleteSelect } from 'app/redux/rings';


const block = purebem.of('project-rings-view');

const ProjectRingsView = React.createClass({

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
        onItemExpand: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        sizes: PropTypes.shape({
            list: PropTypes.array,
            loading: PropTypes.bool
        }).isRequired
    },

    componentWillMount() {
        const pid = this.props.params.id;
        this.ringsRef = firebase.database().ref(`rings/${pid}`);
        this.ringsRef.on('value', this.handleSnap);
    },

    getTrimmedValue(evt) {
        const { value } = evt.target;

        switch (evt.target.name) {
            case 'size':
                return value.trim().replace(',','.');

            case 'serial':
                return value.trim().toUpperCase();
        }
    },

    handleSnap(snap) {
        if (!snap.exists()) {
            this.props.onFetch([]);
            return;
        }

        const sizes = map(snap.val(), (val, key) => {
            return {
                ...val,
                id: key,
                size: key.replace('_','.')
            };
        });

        this.props.onFetch(sizes);
    },

    handleInput(evt) {
        const value = this.getTrimmedValue(evt);
        this.props.onInput(evt.target.name, value);
    },

    handleAutocomplete(evt) {
        this.handleInput(evt);

        const { name, value } = evt.target;
        const pattern = new RegExp(value);
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

        const size = form.size.replace('.', '_');
        this.ringsRef.child(`${size}`).update({ serial: form.serial });
        this.ringsRef.child(`${size}/history/${form.serial}`).set(true);
        this.props.onReset();
    },

    renderForm() {
        const { autocomplete, form, sizes } = this.props;

        if (sizes.loading) {
            return null;
        }

        return (
            <form className={ block('form') } onSubmit={ this.handleSubmit }>
                <FormGroup
                    label="Ring Size"
                    type="inline">
                    <Autocomplete
                        name="size"
                        expanded={ autocomplete.expanded }
                        onChange={ this.handleAutocomplete }
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
    },

    renderList() {
        const { onItemExpand, params, sizes } = this.props;
        const listItemProps = {
            onExpand: onItemExpand,
            projectId: params.id
        };

        if (sizes.loading) {
            return null;
        }

        return (
            <RingsList
                list={ sizes.list }
                listItemProps={ listItemProps } />
        );
    },

    renderSpinner() {
        if (!this.props.sizes.loading) {
            return null;
        }
        return (<Spinner />);
    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="Ring Sizes &amp; Serial Numbers" />
                { this.renderForm() }
                { this.renderList() }
                { this.renderSpinner() }
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        autocomplete: state.rings.autocomplete,
        form: state.rings.form,
        sizes: state.rings.sizes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onItemExpand: (size, expanded) => dispatch(ringsItemExpand(size, { expanded: !expanded })),
        onInput: (name, value) => dispatch(ringsUpdate('form', { [name]: value })),
        onFetch: (list) => dispatch(ringsUpdate('sizes', { list, loading: false })),
        onReset: () => dispatch(ringsFormReset()),
        onAutocompleteUpdate: (list) => dispatch(ringsUpdate('autocomplete', { list, expanded: !!list.length })),
        onAutocompleteExpand: (expanded) => dispatch(ringsUpdate('autocomplete', { expanded })),
        onAutocompleteSelect: (index) => dispatch(ringsAutocompleteSelect(index, { selected: true }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRingsView);
