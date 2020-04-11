const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task',{
    name:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
});


module.exports = Task;