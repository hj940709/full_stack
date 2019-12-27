import axios from 'axios'
const baseUrl = '/api/blog'

const token = 'bearer ' + window.localStorage.getItem('token')
const config = { headers: { Authorization: token } }

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postBlog = async data => {
    const response = await axios.post(baseUrl, data, config)
    return response.data
}

const likeBlog = async (id, likes) => {
    const response =  await axios.put(baseUrl+'/'+id, { likes }, config)
    return response.data
}

const removeBlog = async (id) => {
    const response = axios.delete(baseUrl+'/'+id, config)
    return response.data
}

export default { getAll, postBlog, likeBlog, removeBlog }
