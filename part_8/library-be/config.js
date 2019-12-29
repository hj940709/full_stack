require('dotenv').config()

const PASSWORD = process.env.PASSWORD
const JWT_SECRET = process.env.JWT_SECRET
let MONGODB_URI = `mongodb+srv://fullstack:${PASSWORD}@phonebook-vejmc.mongodb.net/graphql?retryWrites=true&w=majority`
//let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}