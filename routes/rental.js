const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const {Rental} = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const router = express.Router();


Fawn.init(mongoose);


router.get('/', async(req,res) => {
    const rental = await Rental.find().sort('name');
    res.send(rental);
})

router.get('/:id', async(req,res) => {
    const rental = await Rental.findById(req.params.id);
    if(!rental){
        res.status(404).send('Invalid Movie Name');
    }
    else{
        res.send(rental);
    }
})

router.put('/:id', async(req,res) => {
    try{
        const rental = await Rental.findById(req.params.id);
        if(!rental){
            res.status(404).send('Invalid Movie Name');
        }
        rental.name = req.body.name;
    
        try{
            const p = await rental.save();
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
router.post('/', async(req,res) => {
    try{
        const customer = await Customer.findById(req.body.customerId);
        try{
            const movie = await Movie.findById(req.body.movieId);    
            const rental = new Rental({
                customer:{
                    _id: customer._id,
                    name:customer.name,
                    phone:customer.phone
                },
                movie:{
                    _id:movie._id,
                    title: movie.title,
                    dailyRentalRate: movie.dailyRentalRate
                }
            })
            
            try{
                new Fawn.Task()
                .save('rental',rental)
                .update('movies',{_id: movie._id},{
                    $inc:{number:-1}
                })
                .run()
                res.send(rental);
            }
            catch(err){
                console.log(err.message);
                res.status(500).send(err.message);
            }
        }
        catch(err){
            console.log(err.message);
            res.status(400).send(err.message);
        }
        
        }
        catch(err){
            console.log(err.message);
            res.status(400).send(err.message);
        } 
})

router.delete('/:id', async(req,res) => {
    try{
        const rental = await Rental.deleteOne({_id: req.params.id});
        res.send(rental);

    }
    catch(err){
        res.send(err.message);
    }
})



module.exports = router;