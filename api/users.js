const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const {registerValidation, loginValidation} = require('./validation');

router.post('/register', async (req, res) => {

    //validate inputs
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if user already in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email already exists');

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
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
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
    res.header('auth-token', token).json({message: "logged in"});
});

module.exports = router;