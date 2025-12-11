import { afterEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import CustomerAdd from './CustomerAdd.jsx'

// Mockataan palvelukerros, jotta lomake ei tee oikeita HTTP-pyyntöjä.
vi.mock('../services/CustomerService.js', () => ({
  default: { create: vi.fn() },
}))

const makeHandlers = () => ({
  setMessage: vi.fn(),
  setShowMessage: vi.fn(),
  setIspositive: vi.fn(),
  reload: vi.fn(),
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

describe('CustomerAdd', () => {
  it('avaa ja sulkee lomakkeen toggle-napista', () => {
    const handlers = makeHandlers()

    render(
      <CustomerAdd
        x={false}
        reload={handlers.reload}
        setMessage={handlers.setMessage}
        setShowMessage={handlers.setShowMessage}
        setIspositive={handlers.setIspositive}
      />,
    )

    // Lomake on aluksi piilossa -> klikataan auki.
    fireEvent.click(screen.getByRole('button', { name: '(+) Add a new customer' }))
    expect(screen.getByLabelText('Customer ID')).toBeInTheDocument()

    // Klikkaus uudelleen sulkee lomakkeen.
    fireEvent.click(screen.getByRole('button', { name: 'Hide customer creator' }))
    expect(screen.queryByLabelText('Customer ID')).not.toBeInTheDocument()
  })

  it('lähettää lomakkeen onnistuneesti ja resetoi kentät', async () => {
    const handlers = makeHandlers()
    const CustomerService = (await import('../services/CustomerService.js')).default
    CustomerService.create.mockResolvedValue('Created!')
    vi.useFakeTimers()

    render(
      <CustomerAdd
        x={false}
        reload={handlers.reload}
        setMessage={handlers.setMessage}
        setShowMessage={handlers.setShowMessage}
        setIspositive={handlers.setIspositive}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '(+) Add a new customer' }))
    fireEvent.change(screen.getByLabelText('Customer ID'), { target: { value: 'NEW1' } })
    fireEvent.change(screen.getByLabelText('Company Name'), { target: { value: 'New Co' } })

    fireEvent.click(screen.getByRole('button', { name: 'Save customer' }))

    // Odotetaan mikro-tick, jotta mockattu create ehtii resolvata.
    await Promise.resolve()
    expect(CustomerService.create).toHaveBeenCalledWith(
      expect.objectContaining({ customerId: 'NEW1', companyName: 'New Co' }),
    )

    // Onnistumis-callbackit laukeavat heti promisen jälkeen.
    expect(handlers.setMessage).toHaveBeenCalledWith('Created!')
    expect(handlers.setIspositive).toHaveBeenCalledWith(true)
    expect(handlers.setShowMessage).toHaveBeenCalledWith(true)

    // setTimeoutissa piilotetaan viesti ja kutsutaan reload -> ajetaan kellot.
    await vi.runAllTimersAsync()
    expect(handlers.reload).toHaveBeenCalledWith(true)
    expect(handlers.setShowMessage).toHaveBeenCalledWith(false)

    // Kenttien pitäisi tyhjentyä.
    expect(screen.getByLabelText('Customer ID')).toHaveValue('')
    expect(screen.getByLabelText('Company Name')).toHaveValue('')
  })

  it('näyttää virheen, jos tallennus epäonnistuu', async () => {
    const handlers = makeHandlers()
    const CustomerService = (await import('../services/CustomerService.js')).default
    CustomerService.create.mockRejectedValue({ response: { data: 'Duplicate ID' } })
    vi.useFakeTimers()

    render(
      <CustomerAdd
        x={false}
        reload={handlers.reload}
        setMessage={handlers.setMessage}
        setShowMessage={handlers.setShowMessage}
        setIspositive={handlers.setIspositive}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: '(+) Add a new customer' }))
    fireEvent.change(screen.getByLabelText('Customer ID'), { target: { value: 'EXIST' } })
    fireEvent.change(screen.getByLabelText('Company Name'), { target: { value: 'Existing Co' } })

    fireEvent.click(screen.getByRole('button', { name: 'Save customer' }))

    await Promise.resolve()
    await Promise.resolve()

    // Virhecallbackit
    expect(handlers.setMessage).toHaveBeenCalledWith('Duplicate ID')
    expect(handlers.setIspositive).toHaveBeenCalledWith(false)
    expect(handlers.setShowMessage).toHaveBeenCalledWith(true)

    await vi.runAllTimersAsync()
    expect(handlers.setShowMessage).toHaveBeenCalledWith(false)
    // reload ei kutsuta virhepolussa
    expect(handlers.reload).not.toHaveBeenCalled()
  })
})
