const lodash = require('lodash')

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length)
        return blogs.map(blog=>blog.likes).reduce( (base, likes) => likes + base )
    else return 0
}

const favoriteBlog = (blogs) => {
    return blogs.concat().sort((a, b)=> b.likes - a.likes)[0]
}

const mostBlog = (blogs) => {
    const reduced = lodash.reduce(blogs.map(blog=> blog.author), (base, author)=>{
        if (typeof base[author] !== 'undefined') base[author] += 1 
        else base[author]= 1
        return base
    }, {})
    const result_key = Object.keys(reduced).sort((a,b)=>reduced[b] - reduced[a])[0]
    return {author: result_key, blogs: reduced[result_key]}
}

const mostLike = (blogs) => {
    const reduced = lodash.reduce(blogs, (base, blog)=>{
        if(typeof base[blog.author] !== 'undefined') base[blog.author] += blog.likes
        else base[blog.author]= blog.likes
        return base
    }, {})
    const result_key = Object.keys(reduced).sort((a,b)=>reduced[b] - reduced[a])[0]
    return {author: result_key, likes: reduced[result_key]}
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLike
}
