import React from 'react';
import {
    browserHistory,
    IndexRedirect,
    Redirect,
    Route,
    Router
} from 'react-router';

import { AppView } from './app/components';
import { CreateView } from './create/components';
import { LoginView } from './login/components';
import {
    DashboardView,
    EntryView,
    ExportView,
    MembersView,
    ProjectView,
    RingsView
} from './project/components';

import { ProjectsView } from './projects/components';
import { SearchView } from './search/components';


const routes = (
    <Router history={ browserHistory }>
        <Route path="/" component={ AppView }>
            <IndexRedirect to="/login" />

            <Route path="/login" component={ LoginView } />
            
            <Route path="/projects" component={ ProjectsView } />
            <Route path="/create" component={ CreateView } />
            <Route path="/search" component={ SearchView } />

            <Route component={ ProjectView }>
                <Redirect from="/project/:id" to="/project/:id/dashboard" />

                <Route path="/project/:id/dashboard" component={ DashboardView } />
                <Route path="/project/:id/entry" component={ EntryView } />
                <Route path="/project/:id/export" component={ ExportView } />
                <Route path="/project/:id/members" component={ MembersView } />
                <Route path="/project/:id/rings" component={ RingsView } />
            </Route>

            <Redirect from="/project" to="/projects" />

            {/*<Route path="*" component={ NotFoundView } />*/}
        </Route>
    </Router>
);

export default routes;
