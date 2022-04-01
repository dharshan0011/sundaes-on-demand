/**
 * Format a number to USD
 * @param {*} amount Number to be formatted
 * @returns formatted currency
 */

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}
