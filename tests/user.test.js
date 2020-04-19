const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne , userOneId , setTestDB} = require('./fixtures/db')


beforeEach(setTestDB)

test('Sign up new user', async () => {
   const response= await request(app).post('/users').send({
        name: 'User_1',
        email: 'user@mail.com',
        age: 30,
        password: 'userpswd123'
    }).expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user:{
            name: 'User_1',
            email: 'user@mail.com' 
        },
         token:user.tokens[0].token
    });

    expect(user.password).not.toBe('userpswd123');
});

test('login user',async ()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)
});

test('login non - user',async ()=>{
    await request(app).post('/users/login').send({
        email:'some@mail.com',
        password:'somepswrd123'
    }).expect(400);
});

test('Get data for user' , async ()=>{
    await request(app)
    .get('/users/me')
    .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Get data for non-user' , async ()=>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Delete user' , async ()=>{
    await request(app)
    .delete('/users/me')
    .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

    const user = await User.findById();
    expect(user).toBeNull();
});

test('Delete non-user' , async ()=>{
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('Upload avatar img' , async ()=>{
    await request(app)
    .post('/users/me/avatar')
    .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar' , 'tests/fixtures/img.jpg')
    .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Update user' , async()=>{
    await request(app)
    .patch('/users/me')
    .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'NewName'
    })
    .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('NewName');
});

test('Update non-user' , async()=>{
    await request(app)
    .patch('/users/me')
    .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'NewName'
    })
    .expect(400);

});