import React, { Component } from 'react'

export class PlayerCard extends Component {
    render() {
        return (
            <div>
                <code>{this.props.name}</code>
            </div>
        )
    }
}

export default PlayerCard
