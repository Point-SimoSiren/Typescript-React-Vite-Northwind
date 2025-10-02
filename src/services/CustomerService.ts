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
    return axios.post(baseUrl, newCustomer)
}

export default {getAll, create}
