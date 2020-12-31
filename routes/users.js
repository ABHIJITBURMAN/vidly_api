const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const router = express.Router();




router.post('/',async(req,res)=>{
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    // user = new User({
    //     name: req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    //using lodash 
    user = new User(_.pick(req.body,['name','email','password']));
    //generating the password salt and hashed function
    const salt = await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password,salt);
    try{
        const result = await user.save();
        const token = user.generateAuthToken();
        // const token = jwt.sign({_id: user._id},process.env.SECRET);
        //store the jwt token in the header to check if the user is login in or not?
        res.header('x-auth-token',token).send(_.pick(user,['_id', 'name','email']));
    }
    catch(err){
        res.send(err.message);
    }
})
module.exports = router;