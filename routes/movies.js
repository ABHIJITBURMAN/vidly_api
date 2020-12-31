const mongoose = require('mongoose');
const { Movie } = require('../models/movie');
const { Gener, validation} = require('../models/gener');
const express = require('express');
const router = express.Router();



router.get('/', async(req,res) => {
    try{
        const movies = await Movie.find().sort('title');
        res.send(movies);
    }
    catch(err){
        res.send(err.message)
    }
    
})

router.get('/:id', async(req,res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.send(movie);
    }
    catch(err){
        res.send(err.message);
    }
})

router.put('/:id', async(req,res) => {
    try{
        const genre = await Gener.findById(req.body.genreId);
        try{
            const movie = await Movie.findById(req.params.id);
            movie.title = req.body.title;
            movie.genre = {
                _id: genre._id,
                name: genre.name
            };
            movie.number= req.body.number;
            movie.dailyRentalRate = req.body.dailyRentalRate;
            try{
                const p = await movie.save();
                res.send(p);
            }
            catch(err){
                res.send(err.message);
            }
        }
        catch(err){
            res.send(err.message);
        }
        
    }
    catch(err){
        res.send(err.message);
    }
    
    
    // console.log(result);

})
router.post('/', async(req,res) => {
    try{
        const genre = await Gener.findById(req.body.genreId);
        const movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            number: req.body.number,
            dailyRentalRate: req.body.dailyRentalRate
        })
        try{
            const p = await movie.save();
            res.send(p);
        }
        catch(err){
            res.send(err.message);
        }
    }
    catch(err){
        res.send(err.message);
    }
    
})

router.delete('/:id', async(req,res) => {
    try{
        const movie = await Movie.deleteOne({_id: req.params.id});
        res.send(movie);

    }
    catch(err){
        res.send(err.message);
    }
})



module.exports = router;