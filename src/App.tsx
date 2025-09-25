
import './App.css'
import Laskuri from './Laskuri'
import Events from './Events'


const App = () => {

  return (
      <div>
       
      <h1>Northwind Corporation</h1>

      <Events otsikko={"Coming events"} />

      <Laskuri />
      
    </div>
  )
}

export default App
