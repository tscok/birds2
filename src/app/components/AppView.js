import React, { PropTypes } from 'react';
import { Link, Route } from 'react-router-dom';
import purebem from 'purebem';

import { Auth } from 'src/core/components';

import {
    LoginLogout,
    LoginView,
    NavigationView,
    ProjectsView
} from 'src/app/components';

import './AppView.less';


const block = purebem.of('app-view');

const AppView = React.createClass({

    propTypes: {
        // hoc
        auth: PropTypes.object,
        // router
        history: PropTypes.object,
        location: PropTypes.object,
        match: PropTypes.object
    },

    render() {
        const { auth, location, children } = this.props;

        // TODO: Add Message component.

        return (
            <div className={ block() }>
                <header className={ block('header') }>
                    <NavigationView { ...this.props } />
                </header>
                <main className={ block('main') }>
                    <Route exact path="/app" component={() => (<ProjectsView { ...this.props } />)} />
                </main>
            </div>
        );
    }

});

export default Auth(AppView);
