const mongoose = require('mongoose');

//defination of customer
const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    isGold:{
        type: Boolean,
        required: true
    },
    phone:{
        type: Number,
        maxlength: 10,
        minlength: 10,
        required:  true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;