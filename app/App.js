import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase, getUser } from 'app/firebase';

import { LoginView, Navigation } from './views';
import { ModalContainer } from './components';

import { userUpdate } from 'app/redux/actions';


const block = purebem.of('app-view');

const App = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        onRefresh: PropTypes.func.isRequired,
        // ...
        children: PropTypes.node,
        location: PropTypes.object
    },

    componentWillMount() {
        // Refresh user state on reload if logged in.
        firebase.auth().onAuthStateChanged((authData) => {
            if (authData) {
                this.props.onRefresh(getUser(authData));
            } else {
                console.log('no user found');
            }
        });
    },

    componentWillUpdate() {
        const { pathname } = this.props.location;

        // Prevent routing away from login if logged out.
        if (pathname === '/login' && !firebase.auth().currentUser) {
            this.context.router.push('/login');
        }
    },

    renderContent() {
        if (this.props.location.pathname === '/login') {
            return (
                <ModalContainer>
                    <LoginView />
                </ModalContainer>
            );
        }
        return this.props.children;
    },

    render() {
        return (
            <div className={ block() }>
                <Navigation { ...this.props } />
                <main className={ block('main') }>
                    { this.renderContent() }
                </main>
            </div>
        );
    }

});

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: (user) => dispatch(userUpdate(user))
    };
};

export default connect(null, mapDispatchToProps)(App);
