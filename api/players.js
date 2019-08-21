const express = require('express');
const router = express.Router();

var players = [
    {
      id: 1,
      name: 'John'
    },{
      id: 2,
      name: 'Paul'
    },{
      id: 3,
      name: 'Phil'
    },{
      id: 4,
      name: 'Richard'
    }
  ]

router.get('/', (req, res) => {
    res.json(players);
});
router.get('/:id', (req, res) => {
  var currPlayer = players.filter((player) => {
    if(player.id == req.params.id) return true;
  });
  if(currPlayer.length == 1){
    res.json(currPlayer[0])
  } else {
    res.status(404);//Set status to 404 as movie was not found
    res.json({message: "Not Found"});
 }
  res.json(players);
});
router.post('/', (req, res) => {
  if(!req.body.name){
    res.status(400);
    res.json("bad request!");
  }else{
    var newId = players[players.length-1].id+1;
    players.push({
       id: newId,
       name: req.body.name
    });
    res.json({message: "new player created", location: "/api/players/" + newId});
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