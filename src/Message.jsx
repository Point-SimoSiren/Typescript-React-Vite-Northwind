import './App.css'

// Pieni apukomponentti joka näyttää ilmoituksen. Testit varmistavat
// että sisältö ja CSS-luokka vastaavat propseja.
const Message = ({ isPositive, message }) => {
  let tyyli = ''

  // Valitaan CSS-luokka sen perusteella, onko viesti positiivinen vai virhe.
  if (isPositive === true) {
    tyyli = 'pos'
  } else {
    tyyli = 'neg'
  }

  return (
    <div className={tyyli}>
      {message}
    </div>
  )
}

export default Message
