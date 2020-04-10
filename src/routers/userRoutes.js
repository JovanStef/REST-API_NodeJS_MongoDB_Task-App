const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
         await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err.message);
    }
    // user.save()
    //     .then(() => {
    //         res.status(201).send(user)
    //     }).catch((err) => {
    //         res.status(400).send(err.message)
    //     })
});

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }catch(err){
        res.status(400).send(err.message);
    }
    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((err) => {
    //     res.status(400).send(err.message)
    // })
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        user?res.status(200).send(user):res.status(404).send({error:'No such user'});
    }catch(err){
        res.status(500).send(err.message)
    };
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         res.status(404).send({message:'No such user'})
    //     }
    //     res.status(200).send(user)
    // }).catch((err) => {
    //     res.status(500).send(err.message)
    // })
});

router.patch('/users/:id' , async(req,res)=>{
    const keys = Object.keys(req.body);
    const updateKeys = ['name', 'email' , 'password' , 'age'];
    const matchKeys = keys.every((key)=>updateKeys.includes(key));
    if(!matchKeys){
        return res.status(400).send({error:'Invalid keys'})
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id , req.body , { new:true , runValidators:true});
        user?res.status(200).send(user):res.status(404).send({error:'No such user'});
    }catch(err){
        res.status(400).send(err.message)
    }
});

router.delete('/users/:id' , async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        user?res.status(200).send(user):res.status(404).send({error:'No such user'});
    }catch(err){
        res.status(400).send(err.message);
    }
});

module.exports = router;