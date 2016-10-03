import React from 'react';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';

import { AppView } from './app/components';

// import {
//     // LoginView,
//     NotFoundView,
//     // ProfileView,
//     CreateView,
//     SearchView,
//     ProjectView,
//     ProjectEntryView,
//     ProjectExportView,
//     ProjectMembersView,
//     ProjectRingsView,
//     ProjectSitesView
// } from './views';

import { LoginView } from './login/components';
import { ProjectView } from './project/components';
import { ProjectsView } from './projects/components';


const routes = (
    <Router history={ browserHistory }>
        <Route path="/" component={ AppView }>
            <IndexRedirect to="/login" />

            <Route path="/login" component={ LoginView } />
            
            <Route path="/projects" component={ ProjectsView } />
            {/*<Route path="/create" component={ CreateView } />
            <Route path="/search" component={ SearchView } />*/}

            <Route path="/project/:id" component={ ProjectView } />
            {/*<Route path="/project/:id/entry" component={ ProjectEntryView } />
            <Route path="/project/:id/export" component={ ProjectExportView } />
            <Route path="/project/:id/members" component={ ProjectMembersView } />
            <Route path="/project/:id/rings" component={ ProjectRingsView } />
            <Route path="/project/:id/sites" component={ ProjectSitesView } />*/}
            
            <Redirect from="/project" to="/profile" />

            {/*<Route path="*" component={ NotFoundView } />*/}
        </Route>
    </Router>
);

export default routes;
