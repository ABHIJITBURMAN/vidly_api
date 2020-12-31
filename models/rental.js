const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type:String,
                required: true,
            },
            isGold:{
                type: Boolean,
                required: true
            },
            phone:{
                type:Number,
                required: true,
            }
        }),
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type:String,
                required: true,
                trim: true
            },
            dailyRentalRate: {
                type:Number,
                required: true,
                min: 0
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
});
const Rental = mongoose.model('Rental',  rentalSchema)

exports.Rental = Rental