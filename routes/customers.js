const mongoose = require('mongoose');
const express = require('express');
const { Customer } = require('../models/customer');
const router = express.Router();



//get all data
router.get('/',async(req,res) => {
    try{
        const customer = await Customer.find();
        res.send(customer);
    }
    catch(err){
        res.send(err.message);
    }
});

//get particuler one element
router.get('/:id', async(req,res) => {
    try{
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    }
    catch(err){
        res.send(err.message);
    }
});

//create customer
router.post('/', async(req,res)=>{
    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    try{
        const result = await customer.save();
        res.send(result);
    }
    catch(err){
        res.send(err.message);
    }
});

//delete post
router.delete('/:id', async(req,res)=>{
    try{
        const result = await Customer.deleteOne({_id: req.params.id});
        res.send(result);
    }
    catch(err){
        res.send(err.message);
    }
});

module.exports = router;


