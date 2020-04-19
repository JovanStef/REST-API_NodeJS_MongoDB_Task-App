const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {  userOneId,
    userOne,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setTestDB} = require('./fixtures/db');


beforeEach(setTestDB);

test('Create new task' , async()=>{
    const response = await request(app)
    .post('/tasks')
    .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'Test task'
    })
    .expect(200);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('Get tasks', async()=>{
    const response = await request(app)
    .get('/tasks')
    .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toEqual(2)

});

test('Delete task non-user' , async()=>{
    const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set(`Authorization`,`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})
