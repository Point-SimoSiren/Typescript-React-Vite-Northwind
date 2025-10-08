import axios from "axios"

const baseUrl =  "https://localhost:7165/api/Customers"

// Typing for Customer objects
export interface Customer {
  customerId: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
}

// Use: CustomerService.getAll()
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


// use: CustomerService.getAll(customerObject)
const create = (newCustomer: Customer) => {
    const request = axios.post(baseUrl, newCustomer)
    return request.then(response => response.data)
}


// use: CustomerService.getAll(customerObject)
const remove = (id: string) => {
    const request = axios.delete(baseUrl + "/" + id)
    //const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export default {getAll, create, remove}
