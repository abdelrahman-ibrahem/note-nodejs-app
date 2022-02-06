const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlenght: 4,
        maxlength: 25,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail , 'please enter the valid email'],
    },
    password:{
        type: String,
        required: true,
    },
    passwordConfirm:{
        type: String,
        required: true,
        validate:{
            validator: function(v){
                return this.password === v;
            },
            message: "password confirm must be the same password"
        }
    }
});


userSchema.pre('save' , async function(next){
    if (!this.isModified )return next();
    this.password = await bcrypt.hash(this.password , 10);
    this.passwordConfirm = undefined;
    next();
});
const User = mongoose.model('User' , userSchema);
module.exports = User;