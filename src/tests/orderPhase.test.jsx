import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
  //render app
  render(<App />)

  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')

  const cherriesToppings = await screen.findByRole('checkbox', {
    name: /cherries/i,
  })
  userEvent.click(cherriesToppings)

  //find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderButton)

  //check summary information based on order
  let scoopsSubtotal = screen.getByRole('heading', { name: /scoops:/i })
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  let toppingsSubtotal = screen.getByRole('heading', { name: /toppings:/i })
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  let total = screen.getByRole('heading', { name: /total:/i })
  expect(total).toHaveTextContent('3.50')

  const optionItems = screen.getAllByRole('listitem')
  const optionItemsText = optionItems.map((item) => item.textContent)
  // expect(optionItemsText).toEqual(['1 Vanilla', 'Cherries'])

  //accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole('checkbox', { name: /i agree to/i })
  userEvent.click(termsCheckbox)

  //confirm order number on confirmation page
  const confirmButton = screen.getByRole('button', { name: /confirm order/i })
  userEvent.click(confirmButton)

  //click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole('button', {
    name: /create new order/i,
  })
  userEvent.click(newOrderButton)

  //check that scoops and toppings subtotals have been reset
  scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
  total = screen.getByRole('heading', { name: /grand total: \$/i })
  expect(scoopsSubtotal).toHaveTextContent('0.00')
  expect(toppingsSubtotal).toHaveTextContent('0.00')
  expect(total).toHaveTextContent('0.00')
})
