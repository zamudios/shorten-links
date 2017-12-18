import { Meteor } from 'meteor/meteor';     // Named export
import React from 'react';                  // Default export 
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const history = createBrowserHistory();

export const onAuthChange = (isAuthenticated) => {
    const pathname = location.pathname;

    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.replace('/links');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }    
};

export const routes = (
    <Router history={ history }>
        <Switch>
            <Route exact path="/" component={ Login }/>
            <Route path="/Signup" component={ Signup }/>
            <Route path="/Links" component={ Link }/>
            <Route paht="*" component={ NotFound }/>
        </Switch>
    </Router>
);