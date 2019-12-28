import axios from 'axios'
const baseUrl = '/api/blog'

const user = JSON.parse(window.localStorage.getItem('user')) || {token: null}
const token = 'bearer ' + user.token
const config = { headers: { Authorization: token } }

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getBlogById = async id => {
    const response = await axios.get(baseUrl+'/'+id)
    return response.data
}

const postBlog = async data => {
    const response = await axios.post(baseUrl, data, config)
    return response.data
}

const likeBlog = async data => {
    const response =  await axios.put(baseUrl+'/'+data.id, {likes: data.likes + 1 }, config)
    return response.data
}

const removeBlog = async (id) => {
    const response = await axios.delete(baseUrl+'/'+id, config)
    return response.data
}

const commentBlog = async (id, comment) => {
    const response = await axios.post(baseUrl+'/'+id+'/comment', { comment }, config)
    return response.data
}

export default { getAll, getBlogById, postBlog, likeBlog, removeBlog, commentBlog }