const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const PASSWORD = process.env.PASSWORD || ''
const url =
  `mongodb+srv://fullstack:${PASSWORD}@phonebook-vejmc.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result=>{
    console.log('DB connected')
})
.catch(error=>{
    console.log('Error: ' + error.message)
})

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3},
  number: { type: String, required: true, minlength: 8},
  id: String
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)