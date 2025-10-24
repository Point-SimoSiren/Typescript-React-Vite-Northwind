import React, { useState } from 'react'
import './App.css'
//import Laskuri from './Laskuri.jsx'
//import Events from './Events.jsx'
import CustomerList from './CustomerList.jsx'
import Message from './Message.jsx'

const App = () => {
  const [message, setMessage] = useState('')
  const [isPositive, setIspositive] = useState(false)
  const [showMessage, setShowMessage] = useState(false)



  console.log('App render: showMessage=', showMessage, 'message=', message, 'isPositive=', isPositive)
  return (
    <div>
      <h1>Northwind Corporation</h1>
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
