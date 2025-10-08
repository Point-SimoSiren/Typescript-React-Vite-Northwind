import { useEffect, useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService'
import type { Customer } from './services/CustomerService'
import CustomerDetails from './Customer'
import CustomerAdd from './CustomerAdd'
import type { CustomerProps } from './Customer'


const CustomerList = () => {

  // Component state
  const [customers, setCustomers] = useState<Customer[]>([])
  const [show, setShow] = useState(false)
  // x-apumuuttuja: kun reload(!x) kutsutaan, x:n arvo muuttuu true/false ja 
  // useEffect laukaisee asiakasdatan uudelleen haun, 
  // koska x on siinä 2. parametrina, eli ,[x]
  const [x, reload] = useState<boolean>(false)
  const [search, setSearch] = useState("")

  
  useEffect(() => {
    CustomerService.getAll()
      .then((data: Customer[]) => setCustomers(data))
      .catch(error => alert("Customers could not be loaded. " + error.message))
  },[x])

  return (
      <>
        <h2 onClick={() => setShow(!show)}>Customers</h2>

          <CustomerAdd x={x} reload={reload} />

          { /* hakukenttä */ }
          <input type='text' placeholder='Search by Company name' value={search} 
          onChange={({target}) => setSearch(target.value) } />
          
          { /* Asiakkaiden listaus silmukassa */ }
          {show && customers && customers.map(c => {
            
            if (c.companyName.toLowerCase().includes(search.toLowerCase())) {
              return(
                 <CustomerDetails key={c.customerId} customer={c} x={x} reload={reload} />
              )
            }
           }
          )
        }
    </>
  )
}

export default CustomerList