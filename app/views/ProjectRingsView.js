import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase } from 'app/firebase';
import { map } from 'app/lodash';
import { RingsForm, RingsList, Spinner, ViewHeader } from 'app/components';
import { ringsItemExpand, ringsFormReset, ringsUpdate, ringsAutocompleteSelect } from 'app/redux/rings';


const block = purebem.of('project-rings-view');

const ProjectRingsView = React.createClass({

    propTypes: {
        onItemExpand: PropTypes.func.isRequired,
        onFetch: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
        sizes: PropTypes.shape({
            list: PropTypes.array,
            loading: PropTypes.bool
        }).isRequired
    },

    componentWillMount() {
        const pid = this.props.params.id;
        this.ringsRef = firebase.database().ref(`rings/${pid}`)
        this.ringsRef.on('value', this.handleSnap);
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
                size: key.replace('_', '.')
            };
        });

        this.props.onFetch(sizes);
    },

    renderForm() {
        if (this.props.sizes.loading) {
            return null;
        }

        return (
            <RingsForm projectId={ this.props.params.id } />
        );
    },

    renderList() {
        if (this.props.sizes.loading) {
            return null;
        }

        const listItemProps = {
            onExpand: this.props.onItemExpand,
            projectId: this.props.params.id
        };

        return (
            <RingsList
                list={ this.props.sizes.list }
                listItemProps={ listItemProps } />
        );
    },

    renderSpinner() {
        if (!this.props.sizes.loading) {
            return null;
        }

        return (
            <Spinner />
        );
    },

    render() {
        return (
            <div className={ block() }>
                <ViewHeader title="Rings" />
                { this.renderForm() }
                { this.renderList() }
                { this.renderSpinner() }
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        sizes: state.rings.sizes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onItemExpand: (size, expanded) => dispatch(ringsItemExpand(size, { expanded: !expanded })),
        onFetch: (list) => dispatch(ringsUpdate('sizes', { list, loading: false }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRingsView);
