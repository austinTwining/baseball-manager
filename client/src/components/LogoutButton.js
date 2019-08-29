import React, {Component} from 'react';

class LogoutButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            token: ''
        };
    }

    logout(){
        //log in to backend service
        fetch('/api/users/logout')
            .then(response => response.json())
            .then(data => console.log(data.message));
    }

    render(){
        return(
            <div>
                <form>
                    <ul>
                       <li><button type="submit" onClick={(event) => this.logout()}>log out</button></li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default LogoutButton;