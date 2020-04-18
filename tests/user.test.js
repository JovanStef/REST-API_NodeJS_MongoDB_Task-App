const request = require('supertest');
const app = require('../src/app');

test('Sign up new user' , async()=>{
    await request(app).post('/users').send({
        name:'User_1',
        email:'user@mail.com',
        age:30,
        password:'userpswd123'
    }).expect(201);
});