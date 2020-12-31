const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { genresSchema } = require('../models/gener');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')

const Gener = mongoose.model('Genre', genresSchema);



// get informatiion of the current logged in user 
router.get('/me', auth, async(req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.get('/', async(req,res) => {
    const genres = await Gener.find().sort('name');
    res.send(genres);
})

router.get('/:id', async(req,res) => {
    const gener = await Gener.findById(req.params.id);
    if(!gener){
        res.status(404).send('Invalid Movie Name');
    }
    else{
        res.send(gener);
    }
})

router.put('/:id', async(req,res) => {
    
    // const result = validation(req.body);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    try{
        const gener = await Gener.findById(req.params.id);
        if(!gener){
            res.status(404).send('Invalid Movie Name');
        }
        gener.name = req.body.name;
    
        try{
            const p = await gener.save();
            res.send(p);
        }
        catch(err){
            console.log(err.message);
        }
    }
    catch(err){
        console.log(err.message);
    }
    
    
    // console.log(result);

})
router.post('/', auth, async(req,res) => {
    // const result = validation(req.body);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    const gener = new Gener({
        name: req.body.name
    })
    try{
        const p = await gener.save();
        res.send(p);
    }
    catch(err){
        console.log(err.message);
    }
})

router.delete('/:id',[auth, admin],async(req,res) => {
    try{
        const gener = await Gener.deleteOne({_id: req.params.id});
        res.send(gener);

    }
    catch(err){
        res.send(err.message);
    }
})



module.exports = router;