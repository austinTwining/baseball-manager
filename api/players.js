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

module.exports = router;