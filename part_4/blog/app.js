const config = require('./utils/config')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(middleware.tokenExtractor)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app