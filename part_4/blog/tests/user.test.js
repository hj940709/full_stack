const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    let blogObject = new User({
        username: 'aaaa',
        name: 'aaaa',
        passwordHash: await bcrypt.hash('aaaa', 10)
    })
    await blogObject.save()
})

describe('Invalid user creation', ()=>{
    test('invalid username', async () => {
        await api
            .post('/api/user')
            .send({username: '', name: 'bbbb', password: 'bbbb'})
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('missing username', async () => {
        await api
            .post('/api/user')
            .send({name: 'bbbb', password: 'bbbb'})
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('invalid password', async () => {
        await api
            .post('/api/user')
            .send({username: '', name: 'bbbb', password: ''})
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('missing password', async () => {
        await api
            .post('/api/user')
            .send({name: 'bbbb', username: 'bbbb'})
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})





afterAll(() => {
    mongoose.connection.close()
})