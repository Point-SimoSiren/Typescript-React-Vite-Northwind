import { afterEach, describe, expect, it } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Message from './Message'

afterEach(cleanup)

describe('Message', () => {
  it('renderoi viestin tekstin ja pos-tyylin', () => {
    const message = 'Added new Customer'
    const isPositive = true

    render(<Message message={message} isPositive={isPositive} />)

    expect(screen.getByText(message)).toBeInTheDocument()
    expect(screen.getByText(message)).toHaveClass('pos')
  })

  it('renderoi viestin tekstin ja neg-tyylin', () => {
    const message = 'Added new Customer'
    const isPositive = false

    render(<Message message={message} isPositive={isPositive} />)

    expect(screen.getByText(message)).toBeInTheDocument()
    expect(screen.getByText(message)).toHaveClass('neg')
  })
})
