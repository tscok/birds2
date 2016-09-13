import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase, getUser } from './firebase';

import { MenuView } from './menu/components';

import { initialize } from './redux/user/actions';
import { update } from './redux/user/actions';


const block = purebem.of('app-view');

const App = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        children: PropTypes.node,
        location: PropTypes.object,
        onMount: PropTypes.func
    },

    componentDidMount() {
        this.props.onMount();

        firebase.auth().onAuthStateChanged((authData) => {
            console.log('authData:', !!authData);
            if (authData) {
                this.props.onAuth(getUser(authData));
            } else {
                this.context.router.push('/login');
            }
        });
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

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: ({ email, name, photoUrl, uid }) => {
            dispatch(update({ email, name, photoUrl, uid }));
        },
        onMount: () => dispatch(initialize())
    };
};

export default connect(null, mapDispatchToProps)(App);
