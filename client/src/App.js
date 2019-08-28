import React from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

const App = () => {
  return(
    <div>
      <ul>
        <li><LoginForm></LoginForm></li>
        <li><RegistrationForm></RegistrationForm></li>
      </ul>
    </div>
  );
}

export default App;
