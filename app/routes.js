import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import firebaseRef from 'app/firebaseRef';

import App from './views/App';
import CreateView from './views/CreateView';
import EntryView from './views/EntryView';
import ExportView from './views/ExportView';
import LoginView from './views/LoginView';
import MembersView from './views/MembersView';
import NotFoundView from './views/NotFoundView';
import ProfileView from './views/ProfileView';
import ProjectView from './views/ProjectView';
import RingsView from './views/RingsView';
import SearchView from './views/SearchView';


function logout() {
    if (firebaseRef.getAuth()) {
        firebaseRef.unauth();
    }
}

function requireAuth(nextState, replace) {
    if (!firebaseRef.getAuth()) {
        replace('/login');
    }
    console.log('auth ok');
}

const routes = (
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ ProfileView } />

            <Route path="/login" component={ LoginView } onEnter={ logout } />
            
            <Route path="/profile" component={ ProfileView } onEnter={ requireAuth } />
            <Route path="/create" component={ CreateView } />
            <Route path="/search" component={ SearchView } />

            <Route path="/project/:id" component={ ProjectView } onEnter={ requireAuth }>
                <Route path="/project/:id/entry" component={ EntryView } />
                <Route path="/project/:id/members" component={ MembersView } />
                <Route path="/project/:id/rings" component={ RingsView } />
                <Route path="/project/:id/export" component={ ExportView } />
            </Route>

            <Route path="*" component={ NotFoundView } />
        </Route>
    </Router>
);

export default routes;
