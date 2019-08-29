import React, {Component} from 'react';

class LogoutButton extends Component {

    constructor(props) {
        super(props);
    }

    logout(){
        //log in to backend service
        fetch('/api/users/logout')
            .then(response => response.json())
            .then((data) => {
                if(data.message) {
                    console.log(data.message);
                    this.props.history.push('/');
                }
            });
    }

    render(){
        return(
            <div>
                <form>
                    <ul>
                       <li><button type="button" onClick={(event) => this.logout()}>log out</button></li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default LogoutButton;