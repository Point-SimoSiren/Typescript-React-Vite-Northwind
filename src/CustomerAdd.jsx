import { useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService'
//import type { Customer } from './services/CustomerService'

type CustomerAddProps = {
  x: boolean;
  reload: (val: boolean) => void;
  setMessage: (msg: string) => void;
  setShowMessage: (show: boolean) => void;
  setIspositive: (pos: boolean) => void;
}

const CustomerAdd: React.FC<CustomerAddProps> = ({x, reload, setMessage, setShowMessage, setIspositive}) => {

  // Component state
  const [newCustomerId, setNewCustomerId] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactTitle, setNewContactTitle] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFax, setNewFax] = useState("");
  const [showForm, setShowForm] = useState(false);


  // Suoritetaan kun painetaan save nappia
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // sivu ei refresh kuten tavallisesti
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
    
       setMessage(response)
       setIspositive(true)
       setShowMessage(true)
      
  setTimeout(() => {
   setShowMessage(false)
  }, 5000)
  setTimeout(() => {
   reload(!x)
  }, 5100)
    }

  )
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
      <h3 onClick={() => setShowForm(!showForm)}>(+)Adding new customer</h3>

      {showForm && (
        <>
        <hr/>
      <form onSubmit={formSubmit}>
        <div>
          <label>Customer ID</label>
          <input value={newCustomerId} onChange={e => setNewCustomerId(e.target.value)} />
        </div>
        <div>
          <label>Company Name</label>
          <input value={newCompanyName} onChange={e => setNewCompanyName(e.target.value)} />
        </div>
        <div>
          <label>Contact Name</label>
          <input value={newContactName} onChange={e => setNewContactName(e.target.value)} />
        </div>
        <div>
          <label>Contact Title</label>
          <input value={newContactTitle} onChange={e => setNewContactTitle(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <input value={newAddress} onChange={e => setNewAddress(e.target.value)} />
        </div>
        <div>
          <label>City</label>
          <input value={newCity} onChange={e => setNewCity(e.target.value)} />
        </div>
        <div>
          <label>Region</label>
          <input value={newRegion} onChange={e => setNewRegion(e.target.value)} />
        </div>
        <div>
          <label>Postal Code</label>
          <input value={newPostalCode} onChange={e => setNewPostalCode(e.target.value)} />
        </div>
        <div>
          <label>Country</label>
          <input value={newCountry} onChange={e => setNewCountry(e.target.value)} />
        </div>
        <div>
          <label>Phone</label>
          <input value={newPhone} onChange={e => setNewPhone(e.target.value)} />
        </div>
        <div>
          <label>Fax</label>
          <input value={newFax} onChange={e => setNewFax(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
       </>
       )
      }
    </>
  )
}

export default CustomerAdd