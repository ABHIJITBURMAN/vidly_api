const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const router = express.Router();




router.post('/',async(req,res)=>{
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('invalid Username or Password');


    const validPassword = await bcrypt.compare(req.body.password,user.password);

    if(!validPassword) return res.status(400).send('invalid Username or Password');
    const token = user.generateAuthToken();

    res.send(token); 
    
})
module.exports = router;