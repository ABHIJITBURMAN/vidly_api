const mongoose = require('mongoose');
//defination of gener schema
const genresSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});


exports.genresSchema = genresSchema