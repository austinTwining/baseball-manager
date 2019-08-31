const express = require('express');
const router = express.Router();

const Player = require('./models/Player');

router.get('/', async (req, res) => {
  if(!req.body.team_id){
    res.status(400);
    res.json("bad request!");
  }else{
    try{
        const players = await Player.find({team_id: req.body.team_id});
        res.json({players: players});
    }catch(err){
        res.status(400).json({error: err});
    }
}
});
router.post('/', async (req, res) => {
  if(!req.body.name || !req.body.team_id){
    res.status(400);
    res.json("bad request!");
  }else{
    const player = new Player({
      name: req.body.name,
      team_id: req.body.team_id
    });
    try{
        const savedPlayer = await player.save();
        res.json({message: "new player created"});
    }catch(err){
        res.status(400).json({error: err});
    }
  }
});
router.put('/:id', (req, res) => {
  res.status(400);
  res.json("bad request!");
});
router.delete('/:id', (req, res) => {
  res.status(400);
  res.json("bad request!");
});

module.exports = router;