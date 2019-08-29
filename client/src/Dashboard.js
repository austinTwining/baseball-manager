import React, { Component } from 'react'

import LogoutButton from './components/LogoutButton';

export class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            user: ''
        };
    }

    componentWillMount(){
        //authenticate with backend service
        fetch('/api/users/authenticate')
            .then(response => response.json())
            .then((data) => {
                if(!data._id) this.props.history.push("/");
                this.setState({user_id: data._id})
            });
    }

    componentDidMount(){
        //get user
        fetch("/api/users/", {
            method: "GET",
            headers: {
             'Content-Type': 'application/json'
           }
         })
         .then(response => response.json())
         .then((data) => {
            if(!data.user) this.props.history.push("/");
            this.setState({user: data.user})
         });
    }

    render() {
        return (
            <div>
                <code>{this.state.user.name}</code>
                <LogoutButton history={this.props.history}></LogoutButton>
            </div>
        )
    }
}

export default Dashboard;