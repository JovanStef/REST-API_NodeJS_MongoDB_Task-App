require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5e85acb478dbbd120a6aa7a1',{age:1}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:1})
// }).then((count)=>{
// console.log(count)
// }).catch((err)=>{
// console.log(err)
// });

const updateAgeAndCount = async(id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age});
    return count
};

updateAgeAndCount('5e85acb478dbbd120a6aa7a1', 20).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})