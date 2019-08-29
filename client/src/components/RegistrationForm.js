import React, {Component} from 'react';

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            token: ''
        };
    }

    register(){
        //log in to backend service
        fetch("/api/users/register", {
           method: "POST",
           headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          })
        })
        .then((response) => {
            this.setState({token: response.headers.get('auth-token')});
            return response.json();
        })
        .then((data) => {
            console.log(data.message);
        });
    }

    render(){
        return(
            <div>
                <form>
                    <ul>
                        <li><input type="text" name='name' onChange={(event) => this.setState({name: event.target.value})}/></li>
                        <li><input type="text" name='email' onChange={(event) => this.setState({email: event.target.value})}/></li>
                        <li><input type="text" name='password' onChange={(event) => this.setState({password: event.target.value})}/></li>
                        <li><button type="submit" onClick={(event) => this.register()}>register</button></li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;