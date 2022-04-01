import React from 'react'
import { useOrderDetails } from '../../contexts/OrderDetail'
import Options from './Options'

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails()
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />

      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => setOrderPhase('review')}>Order Sundae!</button>
    </div>
  )
}

export default OrderEntry
