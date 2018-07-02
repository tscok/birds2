import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


export default (Component, { initialize, root, terminate = null } = {}) => {

    const Attach = React.createClass({

        propTypes: {
            isInitialized: PropTypes.bool,
            onMount: PropTypes.func,
            onUnmount: PropTypes.func
        },

        componentDidMount() {
            console.log(`Component "${root}" mounted.`);
            if (!this.props.isInitialized) {
                this.props.onMount();
            }
        },

        componentWillUnmount() {
            console.log(`Component "${root}" unmounted.`);
            if (terminate) {
                this.props.onUnmount();
            }
        },

        render() {
            if (!this.props.isInitialized) {
                return null;
            }

            return (
                <Component root={ root } />
            );
        }

    });

    const mapStateToProps = (state) => {
        return {
            isInitialized: root in state.components
        };
    };

    const mapDispatchToProps = (dispatch, props) => {
        return {
            onMount: () => dispatch(initialize({ root })),
            onUnmount: () => dispatch(terminate({ root }))
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(Attach);


    // return connect(mapStateToProps, mapDispatchToProps)(React.createClass({

    //     displayName: 'attach',

    //     propTypes: {
    //         initialized: PropTypes.bool.isRequired,
    //         onMount: PropTypes.func.isRequired,
    //         onUnmount: PropTypes.func.isRequired,
    //         root: PropTypes.string.isRequired,
    //         // ...
    //         component: PropTypes.object
    //     },

    //     componentDidMount() {
    //         console.log(`Component (${this.props.root}) mounted.`);

    //         if (!this.props.initialized) {
    //             this.props.onMount();
    //         }
    //     },

    //     componentWillUnmount() {
    //         console.log(`Component (${this.props.root}) unmounted.`);

    //         if (terminate) {
    //             this.props.onUnmount();
    //         }
    //     },

    //     render() {
    //         if (!this.props.initialized) {
    //             return null;
    //         }

    //         const { initialized, onMount, onUnmount, ...rest } = this.props;

    //         return (
    //             <Component { ...rest } />
    //         );
    //     }

    // }));
};