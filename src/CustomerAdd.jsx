import { useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService'
//import type { Customer } from './services/CustomerService'


const CustomerAdd = () => {



  // Component state
  const [customerId, setCustomerId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");

  return (
    <>
      <h3>Adding new customer</h3>
      <form>
        <div>
          <label>Customer ID</label>
          <input value={customerId} onChange={e => setCustomerId(e.target.value)} />
        </div>
        <div>
          <label>Company Name</label>
          <input value={companyName} onChange={e => setCompanyName(e.target.value)} />
        </div>
        <div>
          <label>Contact Name</label>
          <input value={contactName} onChange={e => setContactName(e.target.value)} />
        </div>
        <div>
          <label>Contact Title</label>
          <input value={contactTitle} onChange={e => setContactTitle(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <input value={address} onChange={e => setAddress(e.target.value)} />
        </div>
        <div>
          <label>City</label>
          <input value={city} onChange={e => setCity(e.target.value)} />
        </div>
        <div>
          <label>Region</label>
          <input value={region} onChange={e => setRegion(e.target.value)} />
        </div>
        <div>
          <label>Postal Code</label>
          <input value={postalCode} onChange={e => setPostalCode(e.target.value)} />
        </div>
        <div>
          <label>Country</label>
          <input value={country} onChange={e => setCountry(e.target.value)} />
        </div>
        <div>
          <label>Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Fax</label>
          <input value={fax} onChange={e => setFax(e.target.value)} />
        </div>
      </form>
    </>
  )
}

export default CustomerAdd