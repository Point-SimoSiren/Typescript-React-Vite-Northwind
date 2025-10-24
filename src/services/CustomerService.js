import axios from 'axios'

const baseUrl = 'https://localhost:7165/api/Customers'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newCustomer => {
  return axios.post(baseUrl, newCustomer).then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const edit = cust => {
  const id = cust.customerId
  return axios.put(`${baseUrl}/${id}`, cust)
}

export default { getAll, create, remove, edit }
