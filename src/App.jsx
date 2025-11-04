import React, { useState, useEffect } from 'react'
import './App.css'
import Laskuri from './Laskuri.jsx'
import Events from './Events.jsx'
import CustomerList from './customer_components/CustomerList.jsx'
import Message from './Message.jsx'
import UserList from './user_components/UserList.jsx'
import Login from './Login' // <-------------

// Navigointi ja Bootstrap importit
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {
  // App komponentin statet
  const [message, setMessage] = useState('')
  const [isPositive, setIspositive] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('') //<-- username talletettu


  useEffect(() => {
  let storedUser = localStorage.getItem("username")
  if (storedUser !== null) {
    setLoggedInUser(storedUser)
  }
},[])


  return (
    <div>

     {!loggedInUser && <Login setMessage={setMessage} setIspositive={setIspositive} 
                setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} />}

   {showMessage && (
        <Message message={message} isPositive={isPositive} />
      )}

      {loggedInUser && 
      <Router>      
      <Navbar className="cosmic-navbar" expand="lg">
        <Nav className="w-100 justify-content-center">
            <Nav.Link href='/customers'>Customers</Nav.Link>
            <Nav.Link href='/users'>Users</Nav.Link>
            <Nav.Link href='/laskuri'>Counter</Nav.Link>
            <Nav.Link href='/events'>Events</Nav.Link>

        </Nav>
      </Navbar>

      <Routes>
          <Route path="/customers"
            element={<CustomerList setMessage={setMessage}
             setIspositive={setIspositive} 
           setShowMessage={setShowMessage} />}>
          </Route>

          <Route path="/users"
            element={<UserList setMessage={setMessage}
             setIspositive={setIspositive} 
           setShowMessage={setShowMessage} />}>
          </Route>

        
           <Route path="/events"
              element={<Events otsikko={"Coming events"} />}>
          </Route>
           
          <Route path="/laskuri"
              element={<Laskuri />}>
          </Route>

        </Routes>

      </Router> }

     

    </div>
  )
}

export default App
