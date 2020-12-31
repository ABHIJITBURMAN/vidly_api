const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const Joi = require('joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rental = require('./routes/rental');
const user = require('./routes/users');
const auth = require('./routes/auth');
const app = express();
require('./startup/prod')(app);


//connect to database
mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(()=> console.log('Connect to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rental', rental);
app.use('/api/users', user);
app.use('/api/auth', auth);
// using middleware
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/',(req,res) => {
    res.render('index',{title:'My express app', message:'hello'})
    // res.send('Hello World!!');
});



const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listing Port ${port}.....`));