import { render, screen } from '../../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'
import { OrderDetailsProvider } from '../../../contexts/OrderDetail'
import OrderEntry from '../OrderEntry'
import Options from '../Options'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />)

  //make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  //update vanilla scoops to 1 and check the  subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when different toppings are checked', async () => {
  render(<Options optionType='toppings' />)

  //check if the subtotal is 0.00 initially
  const subtotal = screen.getByText('Toppings total: $', { exact: false })
  expect(subtotal).toHaveTextContent('0.00')

  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  })

  userEvent.click(cherriesCheckbox)
  expect(subtotal).toHaveTextContent('1.50')

  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: /Hot fudge/i,
  })
  userEvent.click(hotFudgeCheckbox)
  expect(subtotal).toHaveTextContent('3.00')

  userEvent.click(hotFudgeCheckbox)
  expect(subtotal).toHaveTextContent('1.50')
})

describe('grand total', () => {
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    })
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    //check if grand total starts at $0.00
    expect(grandTotal).toHaveTextContent('0.00')

    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')

    expect(grandTotal).toHaveTextContent('2.00')
  })
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    const cherriesTopping = await screen.findByRole('checkbox', {
      name: /Cherries/i,
    })
    userEvent.click(cherriesTopping)

    expect(grandTotal).toHaveTextContent('1.50')
  })

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />)

    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    userEvent.type(vanillaInput, '0')
    // userEvent.clear(vanillaInput)
    expect(grandTotal).toHaveTextContent('0.00')

    const cherriesTopping = await screen.findByRole('checkbox', {
      name: /Cherries/i,
    })
    userEvent.click(cherriesTopping)
    userEvent.click(cherriesTopping)
    expect(grandTotal).toHaveTextContent('0.00')
  })
})
