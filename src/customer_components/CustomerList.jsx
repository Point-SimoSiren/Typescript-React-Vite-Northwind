import { useEffect, useState } from 'react'
import '../App.css'
import CustomerService from '../services/CustomerService.js'
import CustomerDetails from './CustomerDetails.jsx'
import CustomerAdd from './CustomerAdd.jsx'

const CustomerList = ({ setMessage, setShowMessage, setIspositive, hideMessage }) => {
  const [customers, setCustomers] = useState([])
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [x, reload] = useState(false)
  // kenellä on detailit näkyvissä. Arvo id esim. "ALFKI"
  const [detailedId, setDetailedId] = useState("")


  useEffect(() => {
     const token = localStorage.getItem('token')
        CustomerService
            .setToken(token)

    CustomerService.getAll()
      .then(data => setCustomers(data))
      .catch(error => alert('Customers could not be loaded. ' + error.message))
  }, [x])

  const normalizedSearch = search.trim().toLowerCase()

  const filteredCustomers = customers.filter(c => {
    const companyName = (c?.companyName || '').toLowerCase()

    if (normalizedSearch === '') {
      return true
    }

    return companyName.includes(normalizedSearch)
  })

  return (
    <section className='customers-section'>
      <header className='customers-header'>
        <div className='customers-title-group'>
          <h2 className='customers-title' onClick={() => setShow(!show)}>
            Customers
          </h2>
          <p className='customers-subtitle'>Tap the title to toggle the roster</p>
        </div>
        <span className='customers-pill'>{customers.length} total</span>
      </header>

      <CustomerAdd
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIspositive={setIspositive}
        x={x}
        reload={reload}
      />

      <div className='customers-toolbar'>
        <label className='customers-search'>
          <span className='customers-search-label'>Search company</span>
          <input
            type='text'
            placeholder='Search by company name'
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </label>
      </div>

      {show && (
        <div className='customers-list'>
          {/* Asiakkaiden listaus silmukassa */}
          {filteredCustomers.map(c => (
            <CustomerDetails
              key={c.customerId}
              customer={c}
              setMessage={setMessage}
              setIspositive={setIspositive}
              setShowMessage={setShowMessage}
              x={x}
              reload={reload}
              detailedId={detailedId}
              setDetailedId={setDetailedId}
            />
          ))}

          {filteredCustomers.length === 0 && (
            <div className='customers-empty'>
              <p>No matching customers. Try a different riff.</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default CustomerList
