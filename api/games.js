const express = require('express');
const router = express.Router();

const Game = require('./models/Game');

router.get('/', async (req, res) => {
    if(req.body.team_id){
      try{
          var games = await Game.find({team_id: req.body.team_id}).then((game) => {
            return game;
          });
          res.json({games: games});
      }catch(err){
          res.status(400).json({error: err});
      }
    }else{
      res.status(400);
      res.json("bad request!");
    }
});
router.post('/', async (req, res) => {
  if(!req.body){
    res.status(400);
    res.json("bad request!");
  }else{
    const game = new Game({
      team_id: req.body.team_id
    });
    try{
        const savedGame = await game.save();
        res.json({message: "new game created"});
    }catch(err){
        res.status(400).json({error: err});
    }
  }
});
router.put('/', async (req, res) => {
  if(!req.body){
    res.status(400);
    res.json("bad request!");
  }else{

    //updated properties
    var date = req.body.date;
    var innings = req.body.innings;

    console.log(date);
    console.log(innings);

    try{
      const games = await Game.find({_id: req.body.game_id}).then((game) => {
        //update game model
        //if(date) game.update({date_played: date});
        if(innings) game.innings.push(innings);
        res.json({game: game});
      });
    }catch(err){
      res.status(400).json({error: err});
    }
  }
});
router.delete('/:id', (req, res) => {
  res.status(400);
  res.json("bad request!");
});

module.exports = router;