const express = require('express');
const router = express.Router();

const Team = require('./models/Team');

router.get('/', async (req, res) => {
    if(req.user_id){
        try{
            const teams = await Team.find({owner_id: req.user_id});
            res.json({teams: teams});
        }catch(err){
            res.status(400).json({error: err});
        }
    }
});
router.post('/', async (req, res) => {
  if(!req.body.name){
    res.status(400);
    res.json("bad request!");
  }else{
    const team = new Team({
        name: req.body.name,
        owner_id: req.user_id
    });
    try{
        const savedTeam = await team.save();
        res.json({message: "new team created"});
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