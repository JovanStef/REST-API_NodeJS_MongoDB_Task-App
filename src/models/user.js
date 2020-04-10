const mongoose = require('mongoose');
const validator = require('validator');


const User = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    age:{
        type:Number,
        default:00,
        validate(value){
            if(value<0){
                throw new Error ('Age must be a positive number');
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<6){
                throw new Error ('Pasword must be more then 6 characters')
            }
            if(value.toLowerCase().includes('password')){
                throw new Error ('Pasword must must not include word "password"')

            }
        }
    }
});


module.exports = User;