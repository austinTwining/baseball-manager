const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const gameSchema = new mongoose.Schema({
    date_played: {
        type: Date
    },
    innings:[{
        players:[{
            player: {
                type: ObjectId,
                ref: 'Player'
            },
            position: {
                type: String
            }
        }]
    }],
    team_id: {
        type: ObjectId,
        ref: 'Team'
    }
});

module.exports = mongoose.model('Game', gameSchema);