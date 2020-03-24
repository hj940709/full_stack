import axios from 'axios'
const baseUrl = '/api/blog'



const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postBlog = async data => {
    const token = 'bearer ' + window.localStorage.getItem('token')
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, data, config)
    return response.data
}

const likeBlog = async (id, likes) => {
    const token = 'bearer ' + window.localStorage.getItem('token')
    const config = { headers: { Authorization: token } }
    const response =  await axios.put(baseUrl+'/'+id, { likes }, config)
    return response.data
}

const removeBlog = async (id) => {
    const token = 'bearer ' + window.localStorage.getItem('token')
    const config = { headers: { Authorization: token } }
    const response = axios.delete(baseUrl+'/'+id, config)
    return response.data
}

export default { getAll, postBlog, likeBlog, removeBlog }
