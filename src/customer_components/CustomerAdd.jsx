import { useState } from 'react'
import '../App.css'
import CustomerService from '../services/CustomerService.js'

const CustomerAdd = ({x, reload, setMessage, setShowMessage, setIspositive}) => {
 
  const [newCustomerId, setNewCustomerId] = useState('')
  const [newCompanyName, setNewCompanyName] = useState('')
  const [newContactName, setNewContactName] = useState('')
  const [newContactTitle, setNewContactTitle] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newRegion, setNewRegion] = useState('')
  const [newPostalCode, setNewPostalCode] = useState('')
  const [newCountry, setNewCountry] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFax, setNewFax] = useState('')
  const [showForm, setShowForm] = useState(false)

  const formSubmit = e => {
    e.preventDefault()
    const newCustomer = {
      customerId: newCustomerId,
      companyName: newCompanyName,
      contactName: newContactName,
      contactTitle: newContactTitle,
      address: newAddress,
      city: newCity,
      region: newRegion,
      postalCode: newPostalCode,
      country: newCountry,
      phone: newPhone,
      fax: newFax
    }

    CustomerService.create(newCustomer)
      .then(response => {
       
        setNewCustomerId('')
        setNewCompanyName('')
        setNewContactName('')
        setNewContactTitle('')
        setNewAddress('')
        setNewCity('')
        setNewRegion('')
        setNewPostalCode('')
        setNewCountry('')
        setNewPhone('')
        setNewFax('')

        setMessage(response)
        setIspositive(true)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false),
            reload(!x)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.response.data)
        setIspositive(false)
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <>
      <button
        type='button'
        className='customer-form-toggle'
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide customer creator' : '(+) Add a new customer'}
      </button>

      {showForm && (
        <>
          <form onSubmit={formSubmit} className='customer-form'>
            <div className='customer-form-row'>
              <label htmlFor='customerId'>Customer ID</label>
              <input
                id='customerId'
                value={newCustomerId}
                onChange={e => setNewCustomerId(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='companyName'>Company Name</label>
              <input
                id='companyName'
                value={newCompanyName}
                onChange={e => setNewCompanyName(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='contactName'>Contact Name</label>
              <input
                id='contactName'
                value={newContactName}
                onChange={e => setNewContactName(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='contactTitle'>Contact Title</label>
              <input
                id='contactTitle'
                value={newContactTitle}
                onChange={e => setNewContactTitle(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='address'>Address</label>
              <input
                id='address'
                value={newAddress}
                onChange={e => setNewAddress(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='city'>City</label>
              <input
                id='city'
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='region'>Region</label>
              <input
                id='region'
                value={newRegion}
                onChange={e => setNewRegion(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='postalCode'>Postal Code</label>
              <input
                id='postalCode'
                value={newPostalCode}
                onChange={e => setNewPostalCode(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='country'>Country</label>
              <input
                id='country'
                value={newCountry}
                onChange={e => setNewCountry(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='phone'>Phone</label>
              <input
                id='phone'
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
              />
            </div>
            <div className='customer-form-row'>
              <label htmlFor='fax'>Fax</label>
              <input
                id='fax'
                value={newFax}
                onChange={e => setNewFax(e.target.value)}
              />
            </div>
            <div className='customer-form-actions'>
              <button type="submit" className='customer-action accent'>Save customer</button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default CustomerAdd
