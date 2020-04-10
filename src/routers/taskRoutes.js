const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try{
        await task.save();
        res.status(200).send(task)
    }catch(err){
        res.status(400).send(err.message)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((err) => {
    //     res.status(400).send(err.message)
    // })

});

router.get('/tasks', async (req,res)=>{

    try{
        const tasks = await Task.find({});
        res.status(200).send(tasks)
    }catch(err){
        res.status(400).send(err.message)
    }
    // Task.find({}).then((tasks)=>{
    //     res.status(200).send(tasks)
    // }).catch((err)=>{
    //     res.status(500).send(err.message)
    // })
});

router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id);
        task?res.status(200).send(task):res.status(404).send({error:'No such task'});
    }catch(err){
        res.status(400).send(err.message);
    }
    // Task.findById(_id).then((task)=>{
    //     if (!task) {
    //         res.status(404).send({message:'No such task'})
    //     }
    //     res.status(200).send(task)
    // }).catch((err)=>{
    //     res.status(500).send(err.message)
    // })
});

router.patch('/tasks/:id', async (req,res)=>{
    const keys = Object.keys(req.body);
    const updateKeys = ['name', 'completed'];
    const matchKeys = keys.every((key)=> updateKeys.includes(key));
    if(!matchKeys){
        return res.status(404).send({error:'Invalid key'});
    }
    try{
        const taks = await Task.findByIdAndUpdate(req.params.id , req.body , { new:true , runValidators:true});
      task?res.status(200).send(task):res.status(404).send({error:'No task found'});
    }catch(err){
        res.status(400).send(err.message);
    }
});

router.delete('/tasks/:id' , async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        task?res.status(200).send(task):res.status(404).send({error:'No such task'});
    }catch(err){
        res.status(404).send(err.message);
    }
})

module.exports = router;