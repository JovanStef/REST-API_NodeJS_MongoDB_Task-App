const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
})

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required: true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is not valid')
//             }
//         }
//     },
//     age:{
//         type:Number,
//         default:00,
//         validate(value){
//             if(value<0){
//                 throw new Error ('Age must be a positive number');
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         validate(value){
//             if(value.length<6){
//                 throw new Error ('Pasword must be more then 6 characters')
//             }
//             if(value.toLowerCase().includes('password')){
//                 throw new Error ('Pasword must must not include word "password"')

//             }
//         }
//     }
// });

// const Task = mongoose.model('Task',{
//     name:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// });

// const person = new User({
//     name:'Person_4',
//     age:40,
//     email:'peRson_4@mail.com   ',
//     password:'Person_4pass'
// }).save().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log('Error',err.message)
// });


// const runing = new Task({
//     name:"Study"
// }).save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err.message);
// });
