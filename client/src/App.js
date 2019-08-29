import React from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import LogoutButton from './components/LogoutButton';

import './App.css';

const App = () => {
  return(
    <div>
      <ul>
        <li><LoginForm></LoginForm></li>
        <li><RegistrationForm></RegistrationForm></li>
        <li><LogoutButton></LogoutButton></li>
      </ul>
    </div>
  );
}

export default App;
