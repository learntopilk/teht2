import axios from 'axios'
const baseUrl = "http://localhost:3002/persons"


const getAll = () => {
    return axios.get(baseUrl)
}

const create = (contact) => {
    return axios.post(baseUrl, contact)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {getAll, create, update}