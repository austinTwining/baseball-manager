import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <Route path="" component={LandingPage} />
    <Route path="dashboard" component={Dashboard} />
  </Route>
);