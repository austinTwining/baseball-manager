const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

var playersRouter = require('./api/players');

app.use(express.static(path.join(__dirname, 'client/build')));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api endpoint router
app.use('/api/players', playersRouter);

//catchall handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`server started on port ${port}...`);
});