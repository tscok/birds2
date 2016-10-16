import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { ref } from 'js/firebase';

import { Button, Spinner, Status } from 'js/core/components';

import { button as update } from 'js/redux/components/search/actions';


const block = purebem.of('search-result-button');

const SearchResultButton = React.createClass({

    propTypes: {
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        root: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        // redux
        button: PropTypes.shape({
            loading: PropTypes.bool,
            status: PropTypes.string
        }),
        onUpdate: PropTypes.func
    },

    getDefaultProps() {
        return {
            button: {
                loading: true,
                status: 'undefined'
            }
        };
    },

    componentDidMount() {
        const { id, uid } = this.props;
        this.userRef = ref(`groups/${id}/${uid}`);
        this.projectRef = ref(`users/${uid}/projects/${id}`);
        this.projectRef.on('value', this.handleSnap);
    },

    componentWillUnmount() {
        this.projectRef.off('value', this.handleSnap);
    },

    handleSnap(snap) {
        const status = snap.exists() ? snap.val().status : null;
        this.props.onUpdate({ loading: false, status });
    },

    handleClick() {
        const status = this.isPending() ? null : 'pending';
        this.props.onUpdate({ loading: true, status });
        this.projectRef.set({ status });
        this.userRef.set({ status });
    },

    isLoading() {
        return this.props.button.loading;
    },

    isPending() {
        return this.props.button.status === 'pending';
    },

    renderButton() {
        const { button } = this.props;
        const text = this.isPending() ? 'Cancel' : 'Join';

        if (button.status === 'member' || this.isLoading()) {
            return null;
        }

        return (
            <div className={ block('button') }>
                <Button
                    onClick={ this.handleClick }
                    text={ text } />
            </div>
        );
    },

    renderStatus() {
        const { status } = this.props.button;
        const content = !!status ? (<Status status={ status } />) : (<span>&nbsp;</span>);

        if (this.isLoading()) {
            return null;
        }

        return (
            <div className={ block('status') }>
                { content }
            </div>
        );
    },

    renderLoader() {
        if (!this.isLoading()) {
            return null;
        }

        return (
            <Spinner type="circle" />
        );
    },

    render() {
        return (
            <div className={ block() }>
                { this.renderLoader() }
                { this.renderStatus() }
                { this.renderButton() }
            </div>
        );
    }

});

const mapStateToProps = (state, props) => {
    const component = state.components[props.root];
    return {
        button: component[props.path][props.id]
    };
};

const mapDispatchToProps = (dispatch, props) => {
    const { id } = props;
    return {
        onUpdate: ({ loading, status }) => dispatch(update({ id, loading, status }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultButton);
