const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
        ref: 'User'
    },
    comments: [
        {
            content: String,
            timestamp: Number
        }
    ]
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        if(returnedObject.comments)
            returnedObject.comments.forEach(comment=>delete comment._id)
    }
})

module.exports = mongoose.model('Blog', blogSchema)