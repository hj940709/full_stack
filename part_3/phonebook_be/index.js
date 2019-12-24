const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongod')

app.use(express.static('build'))

app.use(cors())
app.use(bodyParser.json())
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))



app.get('/info', (req, res, next) => {
    Person.count({})
    .then(number=>res.json({total: number}))
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons =>{
        res.json(persons.map(person=>person.toJSON()))
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    let newPerson = req.body    
    newPerson.id = Math.ceil(4+ 100* Math.random())
    new Person(newPerson).save()
    .then(result=>{res.json(newPerson)})
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person=>{
        if(person) res.json(person.toJSON())
        else res.status(400).json({error: 'Not found'})
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result=>{res.json({message:'Done'})})
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const newPerson = req.body
    
    Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
      .then(updatedNote => {
        res.json(updatedNote.toJSON())
      })
      .catch(error => next(error))
  })
  

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId')
        return response.status(400).send({ error: 'malformatted id' })
    else if (error.name === 'ValidationError') 
        return response.status(400).json({ error: error.message })
  
    next(error)
  }
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)