const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);

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
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, 'client/build')));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session cookies
app.use(cookieParser());
app.use(session({secret: process.env.TOKEN_SECRET, saveUninitialized: true, resave: true, store: new MongoStore({mongooseConnection: db})}));

//api endpoint router
app.use('/api/users', require('./api/users'));

//verify authentication
app.use(require('./api/verifyToken'));

app.use('/api/teams', require('./api/teams'));
app.use('/api/teams/players', require('./api/players'));

//catchall handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`server started on port ${port}...`);
});