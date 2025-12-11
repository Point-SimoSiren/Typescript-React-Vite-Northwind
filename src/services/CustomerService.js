import axios from 'axios'

const baseUrl = 'https://localhost:7165/api/Customers'

let token = null

// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}


const getAll = () => {
  const config = {
        headers: { Authorization: token },
    }
  return axios.get(baseUrl, config)
  .then(response => response.data)
}

const create = newCustomer => {
   const config = {
        headers: { Authorization: token },
    }
  return axios.post(baseUrl, newCustomer, config)
  .then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const edit = cust => {
  const id = cust.customerId
  return axios.put(`${baseUrl}/${id}`, cust)
}

export default { getAll, create, remove, edit, setToken }
