const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');


const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id:userOneId,
    name: 'Dummmy_1',
    age: 30,
    email: 'dummy_1@mail.com',
    password: 'dummypswd123',
    tokens:[{
        token:jwt.sign({_id:userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
    _id:userTwoId,
    name: 'Dummmy_2',
    age: 20,
    email: 'dummy_2@mail.com',
    password: 'dummypswd123',
    tokens:[{
        token:jwt.sign({_id:userTwoId}, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    name:'Run',
    completed:false,
    user:userOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    name:'Sleep',
    completed:true,
    user:userOne._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    name:'Learn',
    completed:false,
    user:userTwo._id
};

const setTestDB = async()=>{
    await User.deleteMany();
    await Task.deleteMany();

    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();

    await new User(userOne).save();
    await new User(userTwo).save();
}

module.exports ={
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setTestDB
}