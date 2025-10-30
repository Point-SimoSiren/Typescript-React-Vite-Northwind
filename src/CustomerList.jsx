import { useEffect, useState } from 'react'
import './App.css'
import CustomerService from './services/CustomerService.js'
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
    CustomerService.getAll()
      .then(data => setCustomers(data))
      .catch(error => alert('Customers could not be loaded. ' + error.message))
  }, [x])

  return (
    <>
      <h2 onClick={() => setShow(!show)}>Customers</h2>

      <CustomerAdd
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIspositive={setIspositive}
        x={x}
        reload={reload}
      />

      {/* hakukentta */}
      <input
        type='text'
        placeholder='Search by Company name'
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />

      {/* Asiakkaiden listaus silmukassa */}
      {show && customers && customers.map(c => {
        if (c.companyName.toLowerCase().includes(search.toLowerCase())) {
          return (
            <CustomerDetails key={c.customerId} customer={c} setMessage={setMessage} setIspositive={setIspositive}
              setShowMessage={setShowMessage} x={x} reload={reload} detailedId={detailedId}
              setDetailedId={setDetailedId}
            />
          )
        }
        return null
      })}
    </>
  )
}

export default CustomerList
