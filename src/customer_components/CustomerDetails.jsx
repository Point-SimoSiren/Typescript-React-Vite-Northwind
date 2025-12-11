import { useState } from 'react'
import '../App.css'
import CustomerService from '../services/CustomerService.js'
import CustomerEdit from './CustomerEdit.jsx'

// Näyttää asiakkaan tiedot, mahdollistaa poiston ja editointiin siirtymisen.
// Testit mockkaavat verkko- ja confirm-kutsut, joten komponentti pysyy UI-logiikkana.
const CustomerDetails = ({ customer, setMessage, setShowMessage, setIspositive, x, reload,
  detailedId, setDetailedId
 }) => {
  
  // Paikallinen tila hallitsee edit-näkymän avautumista.
  const [editing, setEditing] = useState(false)

  // Poistofunktio pyytää vahvistuksen, kutsuu palvelua ja näyttää ilmoitukset.
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
            setIspositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
            setTimeout(() => {
              setShowMessage(false)
             }, 6000)
          })

  }

  return (
    <>
      {/* Toggle näyttää vain otsikkonapin kun yksityiskohtia ei katsota */}
      {detailedId !== customer.customerId ? (
        <button
          type='button'
          className='customer-toggle'
          onClick={() => setDetailedId(customer.customerId)}
        >
          {customer.companyName}
        </button>
      ) : (
        <button
          type='button'
          className='customer-toggle active'
          onClick={() => setDetailedId('')}
        >
          Hide details
        </button>
      )}

      {/* Varsinainen kortti: näkyy vain kun valitun asiakkaan id täsmää */}
      {detailedId === customer.customerId && (
        <div className="customer-card">
          <div className='customer-card-header'>
            <h4>{customer.companyName}</h4>
            <div className='customer-card-actions'>
              <button type='button' className='customer-action danger' onClick={removeCustomer}>
                Delete
              </button>

              <button type='button' className='customer-action' onClick={() => setEditing(true)}>
                Edit
              </button>
            </div>
          </div>

          {editing && <CustomerEdit custToEdit={customer} x={x} reload={reload}
           setMessage={setMessage} setShowMessage={setShowMessage} setEditing={setEditing}
            setIspositive={setIspositive} />}


        { !editing &&
          <div className='customer-table-wrapper'>
            <table className='customer-table'>
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
            }

        </div>
      )}
    </>
  )
}

export default CustomerDetails
