import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


export default (WrappedComponent, { initialize, root, terminate = null } = {}) => {

    const mapStateToProps = (state) => {
        const component = state.components[root];
        return {
            component,
            root,
            initialized: component !== undefined
        };
    };

    const mapDispatchToProps = (dispatch, props) => {
        return {
            onMount: () => dispatch(initialize(root, props)),
            onUnmount: () => dispatch(terminate({ root }))
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(React.createClass({

        displayName: 'attach',

        propTypes: {
            initialized: PropTypes.bool.isRequired,
            onMount: PropTypes.func.isRequired,
            onUnmount: PropTypes.func.isRequired,
            root: PropTypes.string.isRequired,
            // ...
            component: PropTypes.object
        },

        componentDidMount() {
            console.log(`Component (${this.props.root}) mounted.`);

            if (!this.props.initialized) {
                this.props.onMount();
            }
        },

        componentWillUnmount() {
            console.log(`Component (${this.props.root}) unmounted.`);

            if (terminate) {
                this.props.onUnmount();
            }
        },

        render() {
            if (!this.props.initialized) {
                return null;
            }

            const { initialized, onMount, onUnmount, ...rest } = this.props;

            return (
                <WrappedComponent { ...rest } />
            );
        }

    }));
};