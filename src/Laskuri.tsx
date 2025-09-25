import { useState } from 'react'
import './App.css'

const Laskuri = () => {

  const [count, setCount] = useState<number>(0)

  return (
      <>
      <h3>Laskuri</h3>

      <h4>{count}</h4>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button> 
      <button onClick={() => setCount(0)}>reset</button> 

    </>
  )
}

export default Laskuri
