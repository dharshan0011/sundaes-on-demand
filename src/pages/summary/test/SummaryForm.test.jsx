import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'
describe('summary form', () => {
  test('initial conditions', () => {
    render(<SummaryForm />)
    const orderButton = screen.getByRole('button', { name: /Confirm Order/i })
    const termsCheckbox = screen.getByRole('checkbox', {
      name: /I agree to Terms and Conditions/i,
    })

    expect(orderButton).toBeDisabled()
    expect(termsCheckbox).not.toBeChecked()
  })

  test('enabling order button when checked and disabled when unchecked', () => {
    render(<SummaryForm />)

    const orderButton = screen.getByRole('button', { name: /Confirm Order/i })
    const termsCheckbox = screen.getByRole('checkbox', {
      name: /I agree to Terms and Conditions/i,
    })

    userEvent.click(termsCheckbox)
    expect(orderButton).toBeEnabled()

    userEvent.click(termsCheckbox)
    expect(orderButton).toBeDisabled()
  })

  test('popover responds to hover', async () => {
    render(<SummaryForm />)

    //popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    )
    expect(nullPopover).not.toBeInTheDocument()

    //popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndConditions)

    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    //popover disappears when mouseover stops
    userEvent.unhover(termsAndConditions)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    )
  })
})
