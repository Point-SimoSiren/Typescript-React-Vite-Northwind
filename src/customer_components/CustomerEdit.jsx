import { useState } from 'react'
import '../App.css'
import CustomerService from '../services/CustomerService.js'

const CustomerEdit = ({custToEdit, x, reload, setMessage, setShowMessage, setEditing,
     setIspositive}) => {
 
  const [newCustomerId, setNewCustomerId] = useState(custToEdit.customerId)
  const [newCompanyName, setNewCompanyName] = useState(custToEdit.companyName)
  const [newContactName, setNewContactName] = useState(custToEdit.contactName)
  const [newContactTitle, setNewContactTitle] = useState(custToEdit.contactTitle)
  const [newAddress, setNewAddress] = useState(custToEdit.address)
  const [newCity, setNewCity] = useState(custToEdit.city)
  const [newRegion, setNewRegion] = useState(custToEdit.region)
  const [newPostalCode, setNewPostalCode] = useState(custToEdit.postalCode)
  const [newCountry, setNewCountry] = useState(custToEdit.country)
  const [newPhone, setNewPhone] = useState(custToEdit.phone)
  const [newFax, setNewFax] = useState(custToEdit.fax)


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

    CustomerService.edit(newCustomer)
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

        setMessage(response.data)
        setIspositive(true)
        setShowMessage(true)
         window.scrollBy(0, -10000)
         reload(!x)
        setEditing(false)
      

        setTimeout(() => {
          setShowMessage(false)
        }, 5000)
      })
      .catch(error => {
        setMessage(error.message)
        setIspositive(false)
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <>
      <div className='customer-edit-header'>
        <h4>Editing {custToEdit.companyName}</h4>
      </div>
      <form onSubmit={formSubmit} className='customer-form'>
        <div className='customer-form-row'>
          <label>Customer ID</label>
          <input value={newCustomerId} disabled />
        </div>
        <div className='customer-form-row'>
          <label>Company Name</label>
          <input value={newCompanyName} required onChange={e => setNewCompanyName(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Contact Name</label>
          <input value={newContactName} onChange={e => setNewContactName(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Contact Title</label>
          <input value={newContactTitle} onChange={e => setNewContactTitle(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Address</label>
          <input value={newAddress} onChange={e => setNewAddress(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>City</label>
          <input value={newCity} onChange={e => setNewCity(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Region</label>
          <input value={newRegion} onChange={e => setNewRegion(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Postal Code</label>
          <input value={newPostalCode} onChange={e => setNewPostalCode(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Country</label>
          <input value={newCountry} onChange={e => setNewCountry(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Phone</label>
          <input value={newPhone} onChange={e => setNewPhone(e.target.value)} />
        </div>
        <div className='customer-form-row'>
          <label>Fax</label>
          <input value={newFax} onChange={e => setNewFax(e.target.value)} />
        </div>
        <div className='customer-form-actions'>
          <button type="submit" className='customer-action accent'>Save changes</button>
          <button type='button' className='customer-action ghost' onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </form>
    </>
  )
}

export default CustomerEdit

