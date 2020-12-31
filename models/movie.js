const mongoose = require('mongoose');
const { genresSchema } = require('./gener');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength:200,
        minlength:5
    },
    genre:{
        type:genresSchema,
        required:true
    },
    number:{
        type: Number,
        required: true
    },
    dailyRentalRate:{
        type:Number,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

exports.Movie = Movie;
