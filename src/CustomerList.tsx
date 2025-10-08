import { useEffect, useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService'
import type { Customer } from './services/CustomerService'
import CustomerDetails from './Customer'
import CustomerAdd from './CustomerAdd.tsx'


type CustomerListProps = {
  setMessage: (msg: string) => void;
  setShowMessage: (show: boolean) => void;
  setIspositive: (pos: boolean) => void;
  hideMessage: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({setMessage, setShowMessage, setIspositive, hideMessage}) => {

  // Component state
  const [customers, setCustomers] = useState<Customer[]>([])
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState("")

  
  useEffect(() => {
    CustomerService.getAll()
      .then((data: Customer[]) => setCustomers(data))
      .catch(error => alert("Customers could not be loaded. " + error.message))
  },[])

  return (
      <>
        <h2 onClick={() => setShow(!show)}>Customers</h2>

          <CustomerAdd
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setIspositive={setIspositive}
            hideMessage={hideMessage}
          />

          { /* hakukenttä */ }
          <input type='text' placeholder='Search by Company name' value={search} 
          onChange={({target}) => setSearch(target.value) } />
          
          { /* Asiakkaiden listaus silmukassa */ }
          {show && customers && customers.map(c => {
            
            if (c.companyName.toLowerCase().includes(search.toLowerCase())) {
              return(
                 <CustomerDetails key={c.customerId} customer={c} />
              )
            }
           }
          )
        }
    </>
  )
}

export default CustomerList