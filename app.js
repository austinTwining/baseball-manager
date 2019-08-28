const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

const port = process.env.PORT || 5000;

dotenv.config();

//connect to db
mongoose.connect(
  process.env.DB_CONNECT, 
  {useNewUrlParser: true}, 
  () => {
  console.log('connected to db');
});

app.use(express.static(path.join(__dirname, 'client/build')));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api endpoint router
app.use('/api/players', require('./api/players'));
app.use('/api/users', require('./api/users'));

//catchall handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`server started on port ${port}...`);
});