import axios from 'axios'
const baseUrl = "http://localhost:3002/api/persons"


const getAll = () => {
    return axios.get(baseUrl)
}

const create = (contact) => {
    return axios.post(baseUrl, contact)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, remove}
