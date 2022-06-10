import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(res => res.data)
}

const create = personsObject => {
    const request = axios.post(`${baseUrl}`, personsObject)

    return request.then(res => res.data)
}

const deletePhone = id => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request
}

const update = (id, personsObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personsObject)

    return request.then(res => res.data)
}
export default { getAll, create, deletePhone, update }