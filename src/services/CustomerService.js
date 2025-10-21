import axios from 'axios'

const baseUrl = 'https://localhost:7165/api/Customers'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newCustomer => {
  return axios.post(baseUrl, newCustomer).then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { getAll, create, remove }
