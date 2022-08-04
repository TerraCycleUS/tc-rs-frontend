import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import couponItemsClasses from '../CouponItems/CouponItems.module.scss'
import classes from '../../pages/CouponLanding/CouponLanding.module.scss'
import getProgressPercentage from '../../utils/getProgressPercentage'

export default function CouponRequirement({ droppedAmount, requiredAmount }) {
  return (
    <div
      className={classNames(
        couponItemsClasses.numberItems,
        classes.amountIndicator,
      )}
    >
      <div
        style={{
          width: getProgressPercentage(droppedAmount, requiredAmount),
        }}
        className={couponItemsClasses.progress}
      />
      <div className={couponItemsClasses.itemsText}>
        <FormattedMessage
          id="couponItems:Items"
          defaultMessage="{requiredAmount} items"
          values={{ requiredAmount }}
        />
      </div>
    </div>
  )
}

CouponRequirement.propTypes = {
  droppedAmount: PropTypes.number,
  requiredAmount: PropTypes.number,
}
