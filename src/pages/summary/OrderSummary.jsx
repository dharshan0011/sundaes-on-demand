import React from 'react'
import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../contexts/OrderDetail'

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails()

  const addedScoops = Array.from(orderDetails.scoops.entries).map(
    ([key, value]) => {
      return (
        <li key={key}>
          {value} {key}
        </li>
      )
    }
  )

  const addedToppings = Array.from(orderDetails.toppings.keys()).map((key) => (
    <li key={key}>{key}</li>
  ))

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ol>{addedScoops}</ol>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ol>{addedToppings}</ol>
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}

export default OrderSummary
