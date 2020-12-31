const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:  true,
        minlength:5,
        maxlength:50
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id,isAdmin:this.isAdmin},process.env.SECRET);
    return token;
}
const User = mongoose.model('User', userSchema);

exports.User = User;