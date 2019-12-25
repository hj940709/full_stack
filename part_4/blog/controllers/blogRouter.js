const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
    return response.json(await Blog.find({}).populate('user', {'username': 1, 'name': 1, 'id': 1}))
})

blogsRouter.get('/:id', async (request, response, next) => {
    return response.json(await Blog.findById(request.params.id).populate('user'))
})
  
blogsRouter.post('/', async (request, response, next) => {
    let blog = new Blog(request.body)
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
    if(!request.token || !decodedToken.id)
        return response.status(401).json({error: 'Not logged in'})
    blog.user = decodedToken.id
    try{
        return response.json(await blog.save())
    }catch(exception){
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try{
        const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)
        if(!request.token || !decodedToken.id)
            return response.status(401).json({error: 'Not logged in'})
        const blog = await Blog.findById(request.params.id)
        if(blog.user === decodedToken.id)
            return response.json(await Blog.findByIdAndDelete(request.params.id))
        else return response.status(401).json({error: 'Wrong user'})
    }catch(exception){
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try{
        return response.json(await Blog.findByIdAndUpdate(request.params.id, request.body))
    }catch(exception){
        next(exception)
    }
})

module.exports = blogsRouter