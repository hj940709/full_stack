import axios from 'axios'
const baseUrl = '/api/blog'

const token = 'bearer ' + window.localStorage.getItem('token')
const config = { headers: { Authorization: token } }

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postBlog = async data => {
    return await axios.post(baseUrl, data, config).then(response => response.data)
}

const likeBlog = async (id, likes) => {
    return await axios.put(baseUrl+'/'+id, { likes }, config).then(response => response.data)
}

const removeBlog = async (id) => {
    return await axios.delete(baseUrl+'/'+id, config).then(response => response.data)
}

export default { getAll, postBlog, likeBlog, removeBlog }