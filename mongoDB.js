// const mongoDB = require('mongodb');
// const MongoClient = mongoDB.MongoClient;
// const ObjectID = mongoDB.ObjectID;

//start server
// /home/jovan/Documents/CodeAcademy/mongodb/bin/mongod --dbpath=/home/jovan/Documents/CodeAcademy/mongodb-data

const { MongoClient, ObjectID } = require('mongodb');

const connectURL = 'mongodb://127.0.0.1:27017';
const DBname = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectURL, { useUnifiedTopology: true ,useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
        return console.log('unable to connect to DB!!!');
    }

    const db = client.db(DBname);

    // db.collection('users').insertOne({
    //     name:'Susie'
    //     age:35
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Insert user error!!');
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Dude',
    //         age:20
    //     },
    //     {
    //         name:'Dame',
    //         age:30
    //     }
    // ],(err,result)=>{
    //     if(err){
    //         return console.log('Insert user error!!');
    //     }
    //     console.log(result.ops);
    // });

    //     db.collection('tasks').insertMany([
    //         {
    //         description:'Run',
    //         completed:true
    //     },{
    //         description:'Cook',
    //         completed:false
    //     },{
    //         description:'Study',
    //         completed:false
    //     }
    // ],(err,res)=>{
    //     err?console.log('insert user error'):console.log(res.ops);
    //     });

    //     db.collection('users').findOne({_id:new ObjectID("5e830b5c9be30716c16ad179")},(err,res)=>{
    // err?console.log('err'):console.log(res)
    //     });

    // db.collection('users').find({age:50}).toArray((err,users)=>{
    //     console.log(users)
    // });

    // db.collection('tasks').findOne({ _id: new ObjectID("5e8312b9166a7c1f121de8b7") }, (err, res) => {
    //     err ? console.log('err-find One') : console.log(res)
    // });

    // db.collection('tasks').find({ completed: false }).toArray((err, res) => {
    //     err ? console.log('err-find') : console.log(res)
    // })

    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID("5e830b5c9be30716c16ad179")
    //     }, {
    //     $inc: {
    //         age: -10
    //     }
    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // });

    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // });

    // db.collection('user').deleteMany({
    //     age:27
    // }).then((res)=>{
    //      console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // });

    // db.collection('task').deleteOne({
    //     description: 'Run'
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // });

});