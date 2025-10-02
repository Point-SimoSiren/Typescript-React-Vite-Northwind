import { useEffect, useState } from 'react'
import './App.css'

 interface Event {
    id: string,
    artist: string,
    date: number,
    ticketPrice: number
  }

  type OtsikkoProps = {
    otsikko: string

  }

const Events = ({otsikko}: OtsikkoProps) => {

  const [events, setEvents] = useState([])


  useEffect(() => {
  fetch("https://68d50690e29051d1c0acf3d6.mockapi.io/api/Events")
  .then(res => res.json())
  .then(data => setEvents(data))
  },[])


  function msToDate(ms: number): string {
    const date = new Date(ms);
    return date.toLocaleDateString("fi-FI", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
  }


  return (
      <>
      <h3>{otsikko}</h3>

        {events && events.map((Item: Event) =>
          <div key={Item.id}>
            <p>______*_____*______*______*______</p>
            <h4>On {msToDate(Item.date)}</h4>
            <h3>{Item.artist}</h3>
            <h5>Tickets from {Item.ticketPrice} $ </h5>

          </div>
        )
    }

    </>
  )
}

export default Events