require('dotenv').config()

let PORT = process.env.PORT
const PASSWORD = process.env.PASSWORD
let MONGODB_URI = `mongodb+srv://fullstack:${PASSWORD}@phonebook-vejmc.mongodb.net/blog?retryWrites=true&w=majority`
//let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}