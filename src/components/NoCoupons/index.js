import React from 'react'
import { FormattedMessage } from 'react-intl'
import { ReactComponent as CouponCards } from '../../assets/icons/coupon-cards.svg'
import Text from '../Text'
import classes from './NoCoupons.module.scss'

export default function NoCoupons() {
  return (
    <div className={classes.noCoupons}>
      <CouponCards className={classes.icon} />
      <Text className="empty-text">
        <FormattedMessage
          id="NoCoupons:NoRewards"
          defaultMessage="We didn’t find any rewards."
        />
      </Text>
    </div>
  )
}
