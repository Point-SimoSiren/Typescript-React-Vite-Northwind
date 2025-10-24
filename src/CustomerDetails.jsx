import { useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService.js'
import CustomerEdit from './CustomerEdit.jsx'

const CustomerDetails = ({ customer, setMessage, setShowMessage, setIspositive, x, reload }) => {
  
  // statet
  const [showDetails, setShowDetails] = useState(false)
  const [editing, setEditing] = useState(false)

  // poistofunktio
  const removeCustomer = () => {
    const answer = window.confirm('Remove customer ' + customer.companyName + '?')
    if (!answer) {
      return
    }
    CustomerService.remove(customer.customerId)
      .then(res => {
        if (res.status === 200 || res.status === 204) {
        setMessage(`Successfully removed customer ${customer.companyName}`)
        setIspositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

        // Ilmoituksen piilotus
        setTimeout(() => {
        setShowMessage(false)},
        5000
        )
        reload(!x)
        }
        
            }
        )
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
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

          <button onClick={() => setEditing(true)}>edit</button>

          {editing && <CustomerEdit custToEdit={customer} x={x} reload={reload}
           setMessage={setMessage} setShowMessage={setMessage}
            setIspositive={setIspositive} />}


        { !editing &&
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
            }

        </div>
      )}
    </>
  )
}

export default CustomerDetails
