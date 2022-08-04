import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import classes from '../../pages/CouponLanding/CouponLanding.module.scss'
import couponItemsClasses from '../CouponItems/CouponItems.module.scss'

export default function ActiveCouponRequirement({ requiredAmount }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div
        className={classNames(
          couponItemsClasses.numberItems,
          couponItemsClasses.activeNumberItems,
          classes.amountIndicator,
        )}
      >
        <div className={couponItemsClasses.itemsText}>
          <FormattedMessage
            id="couponItems:Items"
            defaultMessage="{requiredAmount} items"
            values={{ requiredAmount }}
          />
        </div>
      </div>
    </div>
  )
}

ActiveCouponRequirement.propTypes = {
  requiredAmount: PropTypes.number,
}
