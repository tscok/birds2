import React from 'react';
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router';

import { firebaseRef } from 'app/utils';

import {
    AppView,
    LoginView,
    NotFoundView,
    ProfileView,
    CreateView,
    SearchView,
    ProjectView,
    ProjectEntryView,
    ProjectExportView,
    ProjectMembersView,
    ProjectRingsView,
    ProjectSitesView
} from './views';


function logout() {
    if (firebaseRef.getAuth()) {
        firebaseRef.unauth();
    }
}

function requireAuth(nextState, replace) {
    if (!firebaseRef.getAuth()) {
        replace('/login');
    }
}

const routes = (
    <Router history={ browserHistory }>
        <Route path="/" component={ AppView }>
            <IndexRoute component={ ProfileView } onEnter={ requireAuth } />

            <Route path="/login" component={ LoginView } onEnter={ logout } />
            
            <Route path="/profile" component={ ProfileView } onEnter={ requireAuth } />
            <Route path="/create" component={ CreateView } onEnter={ requireAuth } />
            <Route path="/search" component={ SearchView } onEnter={ requireAuth } />

            <Route path="/project/:id" component={ ProjectView } onEnter={ requireAuth } />
            <Route path="/project/:id/entry" component={ ProjectEntryView } onEnter={ requireAuth } />
            <Route path="/project/:id/export" component={ ProjectExportView } onEnter={ requireAuth } />
            <Route path="/project/:id/members" component={ ProjectMembersView } onEnter={ requireAuth } />
            <Route path="/project/:id/rings" component={ ProjectRingsView } onEnter={ requireAuth } />
            <Route path="/project/:id/sites" component={ ProjectSitesView } onEnter={ requireAuth } />
            
            <Redirect from="/project" to="/profile" />

            <Route path="*" component={ NotFoundView } />
        </Route>
    </Router>
);

export default routes;
