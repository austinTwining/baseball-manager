const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    team_id: {
        type: ObjectId,
        ref: 'Team'
    }
});

module.exports = mongoose.model('Player', playerSchema);