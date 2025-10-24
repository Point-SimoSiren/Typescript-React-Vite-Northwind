import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri.jsx'
import Events from './Events.jsx'
import CustomerList from './CustomerList.jsx'
import Message from './Message.jsx'

// Navigointi ja Bootstrap importit
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {
  const [message, setMessage] = useState('')
  const [isPositive, setIspositive] = useState(false)
  const [showMessage, setShowMessage] = useState(false)


  return (
    <div>
      <Router>      
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
            <Nav.Link href='/customers'>Customers</Nav.Link>
            <Nav.Link href='/users'>Users</Nav.Link>
            <Nav.Link href='/laskuri'>Counter</Nav.Link>
        </Nav>
      </Navbar>

      {showMessage && (
        <Message message={message} isPositive={isPositive} />
      )}

      <Routes>
          <Route path="/customers"
            element={<CustomerList setMessage={setMessage}
             setIspositive={setIspositive} 
           setShowMessage={setShowMessage} />}>
          </Route>

           
          <Route path="/laskuri"
              element={<Laskuri />}>
          </Route>

        </Routes>

      </Router>
    </div>
  )
}

export default App
