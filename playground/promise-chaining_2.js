require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5e85aaa3b27a8d11d0493d90').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((count)=>{
// console.log(count)
// }).catch((err)=>{
// console.log(err)
// });

const deleteTaskAndCount = async(id, completed)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed});
    return {count:count,task:task}
};

deleteTaskAndCount('5e85c1d389199b1ac709cdf7',false).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});