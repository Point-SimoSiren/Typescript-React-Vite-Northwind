import React, {useState} from 'react'
import './App.css'
//import Laskuri from './Laskuri.tsx'
//import Events from './Events.tsx'
import CustomerList from './CustomerList.tsx'
import Message from './Message.tsx'


const App: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isPositive, setIspositive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [x, reload] = useState<boolean>(false);

  // Piilota viesti ja päivitä asiakaslista
  const hideMessage = () => {
    setShowMessage(false);
  };

  console.log('App render: showMessage=', showMessage, 'message=', message, 'isPositive=', isPositive);
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
        hideMessage={hideMessage}
      />
      {/* 
      <Events otsikko={"Coming events"} />
      <Laskuri /> */}
    </div>
  );
}

export default App
