import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function requiredItemsText(requiredAmount) {
  if (requiredAmount === 0)
    return (
      <FormattedMessage
        id="couponItems:ItemsZero"
        defaultMessage="{requiredAmount} items"
        values={{ requiredAmount }}
      />
    )
  if (requiredAmount === 1)
    return (
      <FormattedMessage
        id="couponItems:ItemsSingular"
        defaultMessage="{requiredAmount} item"
        values={{ requiredAmount }}
      />
    )
  return (
    <FormattedMessage
      id="couponItems:Items"
      defaultMessage="{requiredAmount} items"
      values={{ requiredAmount }}
    />
  )
}
