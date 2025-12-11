import { describe, expect, it } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import Message from './Message'

describe('Message', () => {
  it('renderoi viestin tekstin', () => {
    const message = 'Added new Customer'
    const isPositive = true

    render(<Message message={message} isPositive={isPositive} />)

    expect(screen.getByText(message)).toBeInTheDocument()
  })
})
