import axios from 'axios'
const baseUrl = '/api/user'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUserById = async id => {
    const response = await axios.get(baseUrl + '/' + id)
    return response.data
}

export default { getAll, getUserById}