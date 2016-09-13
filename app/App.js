import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase, getUser } from './firebase';

import { MenuView } from './menu/components';

import { initialize, update } from './redux/user/actions';


const block = purebem.of('app-view');

const App = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        children: PropTypes.node,
        location: PropTypes.object,
        // ...
        onInit: PropTypes.func,
        onUpdate: PropTypes.func,
        uid: PropTypes.string
    },

    componentDidMount() {
        this.props.onInit();
        this.handleAuthChanges();
    },

    componentWillUpdate(nextProps) {
        /**
         * Redirect to /login if authentication is missing or was lost
         * due to actions that did not trigger 'onAuthStateChanged'.
         */
        const { pathname } = nextProps.location;
        if (!nextProps.uid && pathname !== '/login') {
            this.getLoginRoute();
        }
    },

    handleAuthChanges() {
        firebase.auth().onAuthStateChanged((authData) => {
            console.log('authData:', !!authData);
            if (authData) {
                this.props.onUpdate(getUser(authData));
            } else {
                this.getLoginRoute();
            }
        });
    },

    getLoginRoute() {
        this.context.router.push('/login');
    },

    render() {
        return (
            <div className={ block() }>
                <MenuView />
                <main className={ block('main') }>
                    { this.props.children }
                </main>
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        uid: state.user.uid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInit: () => dispatch(initialize()),
        onUpdate: ({ email, name, photoUrl, uid }) => {
            dispatch(update({ email, name, photoUrl, uid }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
