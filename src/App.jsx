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
     



      {showMessage && (
        <Message message={message} isPositive={isPositive} />
      )}



      <CustomerList
        setMessage={setMessage}
        setShowMessage={setShowMessage}
        setIspositive={setIspositive}
      />
      {/*
      <Events otsikko={'Coming events'} />
      <Laskuri /> */}
    </div>
  )
}

export default App
