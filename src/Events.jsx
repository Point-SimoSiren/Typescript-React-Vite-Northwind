import { useEffect, useState } from 'react'
import './App.css'

const Events = ({ otsikko }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('https://68d50690e29051d1c0acf3d6.mockapi.io/api/Events')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])

  const msToDate = ms => {
    const date = new Date(ms)
    return date.toLocaleDateString('fi-FI', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <>
      <h3>{otsikko}</h3>

      {events && events.map(item => (
        <div key={item.id}>
          <p>______*_____*______*______*______</p>
          <h4>On {msToDate(item.date)}</h4>
          <h3>{item.artist}</h3>
          <h5>Tickets from {item.ticketPrice} $ </h5>
        </div>
      ))}
    </>
  )
}

export default Events
