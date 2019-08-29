const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const {registerValidation, loginValidation} = require('./validation');

router.get('/', async (req, res) => {

    const token = req.session.token;
    if(!token) return res.status(401).send('access denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); 
        req.user = verified;
        var userForId = await User.findOne({_id: req.user});
        res.json({user: userForId});
    }catch(err){
          res.status(400).send('invalid token');  
    }
});

router.post('/register', async (req, res) => {

    //validate inputs
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    //check if user already in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json({message: "email already exists"});

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        //create and assign json web token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

        //start persistent session for user
        req.session.token = token;
        req.session.save();

        res.header('auth-token', token).json({message: "registered"});
    }catch(err){
        res.status(400).json({error: err});
    }
});

router.post('/login', async (req, res) => {
    //validate inputs
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    //check if user already in database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: "user does not exist"});
    
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({message: "invalid password"});

    //create and assign json web token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    //start persistent session for user
    req.session.token = token;
    req.session.save();

    res.header('auth-token', token).json({message: "logged in"});
});

router.get('/logout', (req, res) => {

    //end persistent session for user
    req.session.destroy();

    res.json({message: "logged out"});

});

router.get('/authenticate', (req, res) => {
    const token = req.session.token;
    if(!token) return res.status(401).json({message: "access denied"});

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); 
        req.user = verified;
        res.json({user: verified});
    }catch(err){
          res.status(400).json({message: "invalid token"});  
    }
})

module.exports = router;