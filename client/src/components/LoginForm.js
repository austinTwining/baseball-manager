import React, {Component} from 'react';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            token: ''
        };
    }

    login(){
        //log in to backend service
        fetch("/api/users/login", {
           method: "POST",
           headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          })
        })
        .then((response) => {
            this.setState({token: response.headers.get('auth-token')});
            return response.json()
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
                        <li><input type="text" name='email' onChange={(event) => this.setState({email: event.target.value})}/></li>
                        <li><input type="text" name='password' onChange={(event) => this.setState({password: event.target.value})}/></li>
                        <li><button type="submit" onClick={(event) => this.login()}>log in</button></li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default LoginForm;