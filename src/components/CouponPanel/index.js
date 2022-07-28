import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import classes from './CouponPanel.module.scss'

export default function CouponPanel() {
  return (
    <div className={classes.btnWrapper}>
      <button
        type="button"
        className={classNames(
          classes.rewardBtn,
          classes.left,
          classes.active,
          'my-text-primary',
        )}
      >
        <FormattedMessage id="coupons:Rewards" defaultMessage="Rewards" />
      </button>
      <button
        type="button"
        className={classNames(
          classes.rewardBtn,
          classes.right,
          'my-text-primary',
        )}
      >
        <FormattedMessage id="coupons:MyRewards" defaultMessage="MyRewards" />
        (0)
      </button>
    </div>
  )
}
