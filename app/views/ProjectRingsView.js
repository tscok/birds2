import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { isString } from 'app/utils';
import { filter, map, orderBy } from 'app/lodash';
import { Autocomplete, Button, FormGroup, InputField, List, RingsListHeader, RingsListItem, Spinner, ViewHeader } from 'app/components';
import { ringsFormReset, ringsFormUpdate, ringsUpdate, ringsItemExpand } from 'app/redux/rings';


const block = purebem.of('project-rings-view');

const ProjectRingsView = React.createClass({

    propTypes: {
        autocomplete: PropTypes.array.isRequired,
        list: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        onExpand: PropTypes.func.isRequired,
        onInput: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired,
        // ...
        form: PropTypes.shape({
            size: PropTypes.string,
            serial: PropTypes.string
        })
    },

    componentWillMount() {
        const pid = this.props.params.id;
        this.ringsRef = firebase.database().ref(`rings/${pid}`);
        this.ringsRef.on('value', this.handleSnap);
    },

    getListItemProps() {
        return {
            onExpand: this.props.onExpand,
            projectId: this.props.params.id
        };
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
            this.props.onUpdate({ list: [] });
            return;
        }

        const list = map(snap.val(), (val, key) => {
            return {
                ...val,
                id: key,
                size: key.replace('_','.')
            };
        });

        this.props.onUpdate({ list });
    },

    handleInput(evt) {
        const value = this.getTrimmedValue(evt);
        this.props.onInput(evt.target.name, value);
    },

    handleAutocomplete(evt) {
        this.handleInput(evt);

        const { name, value } = evt.target;
        const pattern = new RegExp(value);
        const autocomplete = filter(this.props.list, (item) => {
            return value && pattern.test(item.size);
        });

        this.props.onUpdate({ autocomplete });
    },

    handleSubmit(evt) {
        evt.preventDefault();
        const { form } = this.props;

        if (!isString(form.size) || !isString(form.serial)) {
            // display error message…
            return;
        }

        const size = Number(form.size).toFixed(1).replace('.','_');
        this.ringsRef.child(`${size}`).update({ serial: form.serial });
        this.ringsRef.child(`${size}/history/${form.serial}`).set(true);
        this.props.onReset();
    },

    renderForm() {
        const { autocomplete, form } = this.props;

        return (
            <form className={ block('form') } onSubmit={ this.handleSubmit }>
                <FormGroup
                    label="Ring Size"
                    type="inline">
                    <Autocomplete
                        name="size"
                        onChange={ this.handleAutocomplete }
                        results={ autocomplete }
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
        const { list, loading } = this.props;

        if (!list.length && loading) {
            return (<Spinner />);
        }

        if (!list.length && !loading) {
            return (<div>[empty]</div>);
        }

        return (
            <List
                list={ orderBy(list, ['size']) }
                listHeader={ RingsListHeader }
                listItem={ RingsListItem }
                listItemProps={ this.getListItemProps() } />
        );
    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="Ring Sizes &amp; Serial Numbers" />
                { this.renderForm() }
                { this.renderList() }
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        autocomplete: state.rings.autocomplete,
        form: state.rings.form,
        list: state.rings.list,
        loading: state.rings.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onExpand: (size, expanded) => dispatch(ringsItemExpand(size, { expanded: !expanded })),
        onInput: (name, value) => dispatch(ringsFormUpdate({ [name]: value })),
        onReset: () => dispatch(ringsFormReset()),
        onUpdate: (data) => dispatch(ringsUpdate({ ...data, loading: false }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRingsView);
