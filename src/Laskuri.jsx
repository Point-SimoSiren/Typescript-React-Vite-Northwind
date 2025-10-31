import { useState } from 'react'
import './App.css'

const Laskuri = () => {

  const [count, setCount] = useState(0)

  return (
    <section className='laskuri-section'>
      <div className='laskuri-card'>
        <header className='laskuri-header'>
          <h3>Laskuri</h3>
          <p className='laskuri-subtitle'>Let the numbers riff and roll</p>
        </header>

        <div className='laskuri-display'>
          <span className='laskuri-count'>{count}</span>
        </div>

        <div className='laskuri-controls'>
          <button
            type='button'
            className='laskuri-button accent'
            onClick={() => setCount(count + 1)}
          >
            Boost
          </button>
          <button
            type='button'
            className='laskuri-button ghost'
            onClick={() => setCount(count - 1)}
          >
            Drop
          </button>
          <button
            type='button'
            className='laskuri-button outline'
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  )
}

export default Laskuri
