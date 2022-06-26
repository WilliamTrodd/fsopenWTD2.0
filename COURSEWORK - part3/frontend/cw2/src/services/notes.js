import axios from 'axios'
const baseURL = '/api/notes'

const getAll = () => {
    const request = axios.get(baseURL)
    /*const nonExisting = {
        id:100,
        content: 'Not saved',
        date: '2019-05-30T17:30:31.098Z',
        important:true,
    }*/
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update}