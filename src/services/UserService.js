import axios from 'axios'

const baseUrl = 'https://localhost:7165/api/Users'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newUser => {
  return axios.post(baseUrl, newUser).then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const edit = user => {
  const id = user.userId
  return axios.put(`${baseUrl}/${id}`, user)
}

export default { getAll, create, remove, edit }
