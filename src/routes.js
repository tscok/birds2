import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SiteView } from './site/components';
import { AppView } from './app/components';


const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={ SiteView } />
            <Route path="/app" component={ AppView } />
        </Switch>
    </Router>
);

export default routes;
