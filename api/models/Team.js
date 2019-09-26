const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    players:[{
        player: {
            type: ObjectId,
            ref: 'Player'
        }
    }],
    owner_id: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Team', teamSchema);