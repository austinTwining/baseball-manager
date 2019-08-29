import React, { Component } from 'react'

export class Dashboard extends Component {

    componentDidMount(){
        //authenticate with backend service
        fetch('/api/users/authenticate')
            .then(response => response.json())
            .then((data) => {
                if(!data.user) this.props.history.push("/");
            });
    }

    render() {
        return (
            <div>
                <code>dashboard</code>
            </div>
        )
    }
}

export default Dashboard;