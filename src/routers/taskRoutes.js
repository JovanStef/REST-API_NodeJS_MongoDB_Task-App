const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks',auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        user:req.user._id
    })
    try {
        await task.save();
        res.status(200).send(task)
    } catch (err) {
        res.status(400).send(err.message)
    }
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((err) => {
    //     res.status(400).send(err.message)
    // })

});

router.get('/tasks',auth, async (req, res) => {
    try {
        // const tasks = await Task.find({user:req.user._id});
        await req.user.populate('tasks').execPopulate();
        res.status(200).send(req.user.tasks);
    } catch (err) {
        res.status(400).send(err.message);
    }
    // Task.find({}).then((tasks)=>{
    //     res.status(200).send(tasks)
    // }).catch((err)=>{
    //     res.status(500).send(err.message)
    // })
});

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id , user:req.user.id})
        task ? res.status(200).send(task) : res.status(404).send({ error: 'No such task' });
    } catch (err) {
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

router.patch('/tasks/:id',auth, async (req, res) => {
    const keys = Object.keys(req.body);
    const updateKeys = ['name', 'completed'];
    const matchKeys = keys.every((key) => updateKeys.includes(key));
    if (!matchKeys) {
        return res.status(404).send({ error: 'Invalid key' });
    }
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id , req.body , { new:true , runValidators:true});
        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({_id:req.params.id , user: req.user._id})

        task ? res.status(200).send(task) : res.status(404).send({ error: 'No task found' });
        keys.forEach((key) => task[key] = req.body[key]);
        await task.save();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.delete('/tasks/:id',auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOne({_id:req.params.id , user: req.user._id});
        task ? res.status(200).send(task) : res.status(404).send({ error: 'No such task' });
    } catch (err) {
        res.status(404).send(err.message);
    }
})

module.exports = router;