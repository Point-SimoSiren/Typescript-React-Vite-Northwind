import { useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService.js'

const CustomerDetails = ({ customer }) => {
  const [showDetails, setShowDetails] = useState(false)

  const removeCustomer = () => {
    const answer = window.confirm('Remove customer ' + customer.companyName + '?')
    if (!answer) {
      return
    }
    CustomerService.remove(customer.customerId)
      .then(res => {
        alert(res)
      })
  }

  return (
    <>
      {!showDetails ? (
        <h3 onClick={() => setShowDetails(!showDetails)}>{customer.companyName}</h3>
      ) : (
        <button onClick={() => setShowDetails(!showDetails)}>
          Hide details
        </button>
      )}

      {showDetails && (
        <div className="customerDetails">
          <h4>{customer.companyName}</h4>

          <button onClick={removeCustomer}>delete</button>
          <button>edit</button>

          <table>
            <thead>
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
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default CustomerDetails
