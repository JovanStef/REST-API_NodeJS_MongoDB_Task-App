const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('Pasword must be more then 6 characters')
            }
            if (value.toLowerCase().includes('password')) {
                throw new Error('Pasword must must not include word "password"')

            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
}); 

//task relation
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'user'
});

//hide info for model
userSchema.methods.toJSON = function (){
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;
    delete userObj.avatar;

    return userObj;
}

//JWT
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'secret');

    user.tokens = user.tokens.concat({ token });
    await  user.save();
    return token;
};

//login checkout
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) { throw new Error('Login failed') }

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) { throw new Error('Login failed') }

    return user;
};


//hashing password
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bycrypt.hash(user.password, 8);
    }
    next();
});

// delete users tsks when user deleted
userSchema.pre('remove',async function (next){
    const user = this;
    await Task.deleteMany({user:user._id})
    next()
})

const User = mongoose.model('User', userSchema);


module.exports = User;