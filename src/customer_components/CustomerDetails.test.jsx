import { afterEach, describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import CustomerDetails from './CustomerDetails.jsx'

// Mockataan verkko- ja lapsikomponentit: testi tarkistaa vain tämän komponentin logiikkaa.
vi.mock('../services/CustomerService.js', () => ({
  default: { remove: vi.fn() },
}))

// Edit-komponentti korvataan yksinkertaisella divillä, jotta renderointi on halpaa ja ennustettavaa.
vi.mock('./CustomerEdit.jsx', () => ({
  default: () => <div>MockedCustomerEdit</div>,
}))

// Yksi testidata-asiakas, jota kierrätetään kaikissa testeissä.
const mockCustomer = {
  customerId: 'ALFKI',
  companyName: 'Alfreds',
  contactName: 'Maria Anders',
  contactTitle: 'Sales Representative',
  address: 'Obere Str. 57',
  city: 'Berlin',
  region: '',
  postalCode: '12209',
  country: 'Germany',
  phone: '030-0074321',
}

// Luodaan uudet spy-handlerit joka testille, ettei kutsut vuoda testien välillä.
const createHandlers = () => ({
  setMessage: vi.fn(),
  setShowMessage: vi.fn(),
  setIspositive: vi.fn(),
  reload: vi.fn(),
  setDetailedId: vi.fn(),
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('CustomerDetails', () => {
  it('avaa kortin klikkauksella kun yksityiskohtia ei näytetä', () => {
    const handlers = createHandlers()

    render(
      <CustomerDetails
        customer={mockCustomer}
        setMessage={handlers.setMessage}
        setShowMessage={handlers.setShowMessage}
        setIspositive={handlers.setIspositive}
        x={false}
        reload={handlers.reload}
        detailedId=''
        setDetailedId={handlers.setDetailedId}
      />,
    )

    // Käyttäjä klikkaa otsikkonappia -> pyydetään parentia näyttämään kortti.
    const toggleButton = screen.getByRole('button', { name: mockCustomer.companyName })
    fireEvent.click(toggleButton)

    expect(handlers.setDetailedId).toHaveBeenCalledWith(mockCustomer.customerId)
  })

  it('näyttää kortin sisällön ja piilottaa sen', () => {
    const handlers = createHandlers()

    render(
      <CustomerDetails
        customer={mockCustomer}
        setMessage={handlers.setMessage}
        setShowMessage={handlers.setShowMessage}
        setIspositive={handlers.setIspositive}
        x={false}
        reload={handlers.reload}
        detailedId={mockCustomer.customerId}
        setDetailedId={handlers.setDetailedId}
      />,
    )

    // detailedId täsmää -> rivit näkyvät, Hide-nappi näkyy.
    expect(screen.getByText(mockCustomer.contactName)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hide details' })).toBeInTheDocument()

    // Hide tyhjentää detailedId:n -> kortti piiloon.
    fireEvent.click(screen.getByRole('button', { name: 'Hide details' }))
    expect(handlers.setDetailedId).toHaveBeenCalledWith('')
  })

  it('avaa edit-näkymän', () => {
    const handlers = createHandlers()

    render(
      <CustomerDetails
        customer={mockCustomer}
        setMessage={handlers.setMessage}
        setShowMessage={handlers.setShowMessage}
        setIspositive={handlers.setIspositive}
        x={false}
        reload={handlers.reload}
        detailedId={mockCustomer.customerId}
        setDetailedId={handlers.setDetailedId}
      />,
    )

    // Edit-painike vaihtaa editing-tilaa -> mockattu CustomerEdit ilmestyy.
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    expect(screen.getByText('MockedCustomerEdit')).toBeInTheDocument()
  })

  it('poistaa asiakkaan ja kutsuu ilmoituksia', async () => {
    const handlers = createHandlers()
    const CustomerService = (await import('../services/CustomerService.js')).default

    // Mockataan confirm ja scrollBy, jotta testi ei avaa oikeaa dialogia tai scrollaa sivua.
    window.confirm = vi.fn().mockReturnValue(true)
    window.scrollBy = vi.fn()
    CustomerService.remove.mockResolvedValue({ status: 204 })

    render(
      <CustomerDetails
        customer={mockCustomer}
        setMessage={handlers.setMessage}
        setShowMessage={handlers.setShowMessage}
        setIspositive={handlers.setIspositive}
        x={false}
        reload={handlers.reload}
        detailedId={mockCustomer.customerId}
        setDetailedId={handlers.setDetailedId}
      />,
    )

    // Delete käynnistää poistoketjun -> mockattu remove palauttaa 204.
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))

    // Odotetaan async-kutsua ja UI-callbackeja.
    await waitFor(() => expect(CustomerService.remove).toHaveBeenCalledWith(mockCustomer.customerId))
    expect(handlers.setMessage).toHaveBeenCalledWith(
      `Successfully removed customer ${mockCustomer.companyName}`,
    )
    expect(handlers.setIspositive).toHaveBeenCalledWith(true)
    expect(handlers.setShowMessage).toHaveBeenCalledWith(true)
    expect(handlers.reload).toHaveBeenCalledWith(true)
  })
})
