
import { useEffect, useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService'
import type { Customer } from './services/CustomerService'
import CustomerDetails from './Customer'


const CustomerList = () => {

  // Component state
  const [customers, setCustomers] = useState<Customer[]>([])
  const [show, setShow] = useState(false)


  useEffect(() => {
    CustomerService.getAll()
      .then((data: Customer[]) => setCustomers(data))
      .catch(error => alert("Customers could not be loaded. " + error.message))
  },[])

  return (
      <>
        <h2 onClick={() => setShow(!show)}>Customers</h2>
          
          {show && customers && customers.map(c =>
            
            <CustomerDetails key={c.customerId} customer={c} />
          )
        }

    </>
  )
}

export default CustomerList