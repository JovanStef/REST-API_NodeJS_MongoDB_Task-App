const express = require('express');
const multer = require('multer');
const sharp = require('sharp'); 
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err.message);
    }
    // user.save()
    //     .then(() => {
    //         res.status(201).send(user)
    //     }).catch((err) => {
    //         res.status(400).send(err.message)
    //     })
});


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send('Logged out');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged Out All');
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err.message);
    }
    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((err) => {
    //     res.status(400).send(err.message)
    // })
});
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);

});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        user ? res.status(200).send(user) : res.status(404).send({ error: 'No such user' });
    } catch (err) {
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

router.patch('/users/me', auth, async (req, res) => {
    const keys = Object.keys(req.body);
    const updateKeys = ['name', 'email', 'password', 'age'];
    const matchKeys = keys.every((key) => updateKeys.includes(key));
    if (!matchKeys) {
        return res.status(400).send({ error: 'Invalid keys' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id , req.body , { new:true , runValidators:true});
        const user = req.user;
        keys.forEach((key) => user[key] = req.body[key]);
        await user.save();

        user ? res.status(200).send(user) : res.status(404).send({ error: 'No such user' });
    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        // user ? res.status(200).send(user) : res.status(404).send({ error: 'No such user' });
        await req.user.remove();
        res.send(req.user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        file.originalname.match(/\.(jpg|jpeg|png)$/) ? cb(undefined, true) : cb(new Error('Please upload an image (.jpg or .png)'))
    }
});

//Uploading files/images
router.post('/users/me/avatar', [auth, upload.single('avatar')], async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    // HTML <img src="datat:image/jpg;base40 , --binary code --">
    // req.user.avatar = req.f ile.buffer;
    await req.user.save();
    res.send('img uploaded');
}, (err, req, res, next) => {
    res.status(400).send({ err: err.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    // HTML <img src="datat:image/jpg;base40 , --binary code --">
    req.user.avatar = undefined;
    await req.user.save();
    res.send('img deleted');
}, (err, req, res, next) => {
    res.status(400).send({ err: err.message });
});

router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-type', 'image/png');
        res.send(user.avatar);
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router;