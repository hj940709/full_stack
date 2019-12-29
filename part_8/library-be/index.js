const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./model/Book')
const Author = require('./model/Author')
const User = require('./model/User')
const config = require('./config')
console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})
const pubsub = new PubSub()

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
  
    type Token {
        value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Subscription {
        bookAdded: Book!
      }  
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String]!
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Query {
        hello: String!
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author]!
        me: User
    }
`

const resolvers = {
    

    Mutation: {
        addBook: async (global, args, context) => {
            if(!context.currentUser) throw new AuthenticationError("Not Authenticated")
            try{
                let bookObject = { ...args}
                let author = await Author.findOne({name: args.author})
                if(!author)
                    author = await new Author({name: args.author}).save()
                bookObject.author = author._id
                const book = await new Book(bookObject).save()
                pubsub.publish('BOOK_ADDED', { bookAdded: book })
                return book
            }catch(error){
                throw new UserInputError(error.message, {invalidArgs: args})
            }
        },
        editAuthor: (global, args, context) => {
            if(!context.currentUser) throw new AuthenticationError("Not Authenticated")
            try{
                return Author.findOneAndUpdate({name: args.name}, {$set: {born: args.setBornTo}})
            }catch(error){
                throw new UserInputError(error.message, {invalidArgs: args})
            }
        },
        createUser: (global, args) => {
            try{
                return new User({ ...args }).save()
            }catch{
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'secret' ) {
                throw new UserInputError("wrong credentials")
            }
        
            const userForToken = {
                username: user.username,
                id: user._id,
            }
        
            return { value: jwt.sign(userForToken, config.JWT_SECRET) }
        },

    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
    Query: {
        hello: () => "world",
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (global, args) => {
            let condition = {}
            if (typeof args.author !== 'undefined'){
                const result = await Author.findOne({author: args.author})
                if(!result) return []
                condition.author = result._id
            }
            if (typeof args.genre !== 'undefined') condition.genres = args.genre
            return Book.find(condition)
        },
        allAuthors: () => Author.aggregate([
            {$lookup:{from: 'books', localField: '_id', foreignField: 'author', as: 'books'}}, 
            {$project: {_id:0, id:'$_id', name:1, born: 1,bookCount: {$size: '$books'}}}]),
        me: (global, args, context) => context.currentUser
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), config.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
