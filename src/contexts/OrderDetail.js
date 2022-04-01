import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { pricePerItem } from '../constants'
import { formatCurrency } from '../utilities'

const OrderDetails = createContext()

//Create custom hook to check whether we're inside a provider

export const useOrderDetails = () => {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error(
      'userOrderDetails must be used within an OrderDetailsProvider'
    )
  }

  return context
}

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }

  return optionCount * pricePerItem[optionType]
}

export const OrderDetailsProvider = (props) => {
  const [optionsCount, setOptionsCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })
  const zeroCurrency = formatCurrency(0)
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  })

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionsCount)
    const toppingsSubtotal = calculateSubtotal('toppings', optionsCount)
    const grandTotal = scoopsSubtotal + toppingsSubtotal
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionsCount])

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionsCount = { ...optionsCount }

      //update option count for this item with new value
      const optionCountsMap = optionsCount[optionType]
      optionCountsMap.set(itemName, parseInt(newItemCount))

      setOptionsCount(newOptionsCount)
    }
    //getter: object containing option counts for scoops and toppings and subtotal, total
    //setter: updateOptionsCount

    const resetOrderDetails = () => {
      const zeroCurrency = formatCurrency(0)
      setTotals({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
      })
      setOptionsCount({
        scoops: new Map(),
        toppings: new Map(),
      })
    }
    return [{ ...optionsCount, totals }, updateItemCount, resetOrderDetails]
  }, [totals, optionsCount])

  return <OrderDetails.Provider value={value} {...props} />
}
