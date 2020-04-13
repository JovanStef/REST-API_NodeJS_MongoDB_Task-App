const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
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
},
{
    timestamps:true
});

const Task = mongoose.model('Task',taskSchema)

module.exports = Task;