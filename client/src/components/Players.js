import React, {Component} from 'react';
import PlayerCard from "./PlayerCard";

class Players extends Component {

    state = {players:[]}
    
    componentDidMount() {
        fetch('/api/players')
            .then(response => response.json())
            .then(players => this.setState({ players }));
    }
    

    render(){
        const {players} = this.state;

        console.log(players);

        return(

            <div>

                {players.length ? (
                    <div>
                        <h1>Players</h1>
                        <ul className="players">
                            {players.map((player) =>
                                 <PlayerCard key={player.id} name={player.name}></PlayerCard>
                            )}
                        </ul>
                    </div>
                ):(
                    <code>ERROR</code>
                )}
                
            </div>
        );
    }
}

export default Players;