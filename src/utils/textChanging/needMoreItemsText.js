import React from 'react'
import { FormattedMessage } from 'react-intl'
import classes from '../../components/CouponItems/CouponItems.module.scss'

export default function needMoreItemsText(difference, category) {
  if (difference === 1)
    return (
      <FormattedMessage
        id="couponItems:MoreSingular"
        defaultMessage="Recycle <green>{difference} more {category} item</green> to unlock reward"
        values={{
          difference,
          green: (chunks) => <span className={classes.green}>{chunks}</span>,
          category,
        }}
      />
    )
  return (
    <FormattedMessage
      id="couponItems:More"
      defaultMessage="Recycle <green>{difference} more {category} items</green> to unlock reward"
      values={{
        difference,
        green: (chunks) => <span className={classes.green}>{chunks}</span>,
        category,
      }}
    />
  )
}
