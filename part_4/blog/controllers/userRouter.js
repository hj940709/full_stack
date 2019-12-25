const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
    response.json(await User.find({}).populate('blogs', {'title': 1, 'author': 1, 'url': 1, 'id': 1}))
})

userRouter.get('/:id', async (request, response, next) => {
    response.json(await User.findById(request.params.id))
})
  
userRouter.post('/', async (request, response, next) => {
    let user = request.body
    if(typeof user.password === 'undefined' || user.password.length<3){
        return response.status(400).json({error: 'Invalid password'})
    }

    user.passwordHash = await bcrypt.hash(user.password, 10)
    delete user.password
    try{
        return response.json(await new User(user).save())
    }catch(exception){
        next(exception)
    }

})

userRouter.delete('/:id', async (request, response, next) => {
    try{
        return response.json(await User.findByIdAndDelete(request.params.id))
    }catch(exception){
        next(exception)
    }
})

userRouter.put('/:id', async (request, response, next) => {
    try{
        return response.json(await User.findByIdAndUpdate(request.params.id, request.body))
    }catch(exception){
        next(exception)
    }
})

module.exports = userRouter