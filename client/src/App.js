import React from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';

const App = () => {
  return(
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div>
        <Route exact path="/" component={LandingPage} />
      </div>
      <div>
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </div>
  );
}

export default App;
