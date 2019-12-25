const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const blogs = require('./router_test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(blogs[0])
    await blogObject.save()

    blogObject = new Blog(blogs[1])
    await blogObject.save()
})

test('Blogs are returned as json', async () => {
    const response = await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/) 
    expect(response.body.length).toEqual(2)
})

test('id is defined', async () => {
    const response = await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    response.body.forEach(blog=>{
        expect(blog.id).toBeDefined()
    })
})

test('post new blog', async () => {
    const response = await api
        .post('/api/blog')
        .send(blogs[blogs.length-1])
        .expect(200)
        .expect('Content-Type', /application\/json/)
    delete response.body.id
    expect(response.body).toEqual(blogs[blogs.length-1])
})

test('missing field', async () => {
    await api
        .post('/api/blog')
        .send({})
        .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})