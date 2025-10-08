import { useState } from 'react'
import './App.css'
//import CustomerService from './services/CustomerService'
import type { Customer } from './services/CustomerService'
import CustomerService from './services/CustomerService'

export type CustomerProps = {
    customer: Customer,
    x: boolean,
    reload: any
      
    }
  

// Receive customer object as a prop with aliasname customer
// from CustomerList components map loop
const CustomerDetails = ({customer, x, reload}: CustomerProps) => {

  // Component state
const [showDetails, setShowDetails] = useState(false)


// Poisto funktio
const removeCustomer = (): void => {
  const answer = window.confirm("Remove customer " + customer.companyName + "?")
  if (answer === false) {
    return;
  }
  
  CustomerService.remove(customer.customerId)
   .then(res => alert(res))
   .then(reload(!x))

}

  return (
    <>
        {!showDetails ?
        <h3 onClick={() => setShowDetails(!showDetails)}>{customer.companyName}</h3>
        : <button onClick={() => setShowDetails(!showDetails)}>
            Hide details</button>
        }
        
        {showDetails && 
        <div className="customerDetails">
            <h4>{customer.companyName}</h4>

            <button onClick={() => removeCustomer()}>delete</button>
            <button>edit</button>

            <table>
                <tr>
                    <th>Contact Name</th>
                    <th>Title</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Region</th>
                    <th>Postal Code</th>
                    <th>Country</th>
                    <th>Phone</th>
                </tr>
                <tr>
                    <td>{customer.contactName}</td>
                    <td>{customer.contactTitle}</td>
                    <td>{customer.address}</td>
                    <td>{customer.city}</td>
                    <td>{customer.region}</td>
                    <td>{customer.postalCode}</td>
                    <td>{customer.country}</td>
                    <td>{customer.phone}</td>
                </tr>
            </table>
        </div>
        }

    </>
  )
}

export default CustomerDetails