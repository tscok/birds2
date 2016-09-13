import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import purebem from 'purebem';

import { firebase, getUser } from 'app/firebase';

import MenuView from './menu/components';
// import { Navigation } from './views';

// import { userUpdate } from 'app/redux/user';
import { update } from 'app/redux/user/actions';


const block = purebem.of('app-view');

const App = React.createClass({

    contextTypes: {
        router: PropTypes.object
    },

    propTypes: {
        onRefresh: PropTypes.func,
        // ...
        children: PropTypes.node,
        location: PropTypes.object,
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            photoURL: PropTypes.string,
            uid: PropTypes.string
        })
    },

    componentDidMount() {
        // firebase.auth().onAuthStateChanged((authData) => {
        //     const { pathname } = this.props.location;
        //     const { uid } = this.props.user;

        //     if (!authData && pathname !== '/login') {
        //         console.log('[authChange] redirect to login');
        //         this.context.router.push('/login');
        //     }

        //     if (!uid && authData && pathname !== '/login') {
        //         console.log('[authChange] user refreshed');
        //         this.props.onRefresh(getUser(authData));
        //     }
        // });
    },

    componentWillUpdate(nextProps) {
        // const { pathname } = nextProps.location;
        // const { uid } = nextProps.user;

        // if (!uid && pathname !== '/login') {
        //     console.log('[willUpdate] redirect to login');
        //     this.context.router.push('/login');
        // }
    },

    render() {
        return (
            <div className={ block() }>
                <MenuView { ...this.props } />
                <main className={ block('main') }>
                    <div className="container">
                        { this.props.children }
                    </div>
                </main>
            </div>
        );
    }

});

const mapStateToProps = (state) => {
    return {
        // user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // onRefresh: (user) => dispatch(update(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
