import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetail'

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null)
  // const [resetOrderDetails] = useOrderDetails()
  const [orderDetails, updateItemCount, resetOrderDetails] = useOrderDetails()

  useEffect(() => {
    axios.post('http://localhost:3030/order').then((response) => {
      setOrderNumber(response.data.orderNumber)
    })
  }, [])
  return orderNumber === null ? (
    <p>Loading...</p>
  ) : (
    <div>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <p>As per our terms and conditions, nothing will happen now</p>
      <button
        onClick={() => {
          resetOrderDetails()
          setOrderPhase('inProgress')
        }}
      >
        Create new order
      </button>
    </div>
  )
}

export default OrderConfirmation
