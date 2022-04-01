import { render, screen } from '../../../test-utils/testing-library'
import { OrderDetailsProvider } from '../../../contexts/OrderDetail'

import Options from '../Options'

test('displays images for each scoop option from server', async () => {
  render(<Options optionType='scoops' />)

  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  //confirm alt text images
  const altText = scoopImages.map((element) => element.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('all images of toppings rendered correctly', async () => {
  render(<Options optionType='toppings' />)
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map((image) => image.alt)
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})
