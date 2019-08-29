import React, { Component } from 'react'
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

export class LandingPage extends Component {

    componentWillMount(){
        //authenticate with backend service
        fetch('/api/users/authenticate')
            .then(response => response.json())
            .then((data) => {
                if(data._id) this.props.history.push("/dashboard");
            });
    }

    render() {
        return (
            <div>
                <ul>
                    <li><LoginForm></LoginForm></li>
                    <li><RegistrationForm></RegistrationForm></li>
                </ul>
            </div>
        )
    }
}

export default LandingPage;