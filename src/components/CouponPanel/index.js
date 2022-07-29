import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import classes from './CouponPanel.module.scss'

export default function CouponPanel({
  showActive,
  setShowActive,
  activeAmount,
}) {
  const amountLabel = `(${activeAmount})`
  function checkIfActive() {
    if (showActive) return classes.active
    return ''
  }

  function checkIfNotActive() {
    if (!showActive) return classes.active
    return ''
  }

  return (
    <div className={classes.btnWrapper}>
      <button
        onClick={() => {
          setShowActive(false)
        }}
        type="button"
        className={classNames(
          classes.rewardBtn,
          classes.left,
          checkIfNotActive(),
          'my-text-primary',
        )}
      >
        <FormattedMessage id="coupons:Rewards" defaultMessage="Rewards" />
      </button>
      <button
        onClick={() => {
          setShowActive(true)
        }}
        type="button"
        className={classNames(
          classes.rewardBtn,
          classes.right,
          checkIfActive(),
          'my-text-primary',
        )}
      >
        <FormattedMessage id="coupons:MyRewards" defaultMessage="MyRewards" />
        {amountLabel}
      </button>
    </div>
  )
}

CouponPanel.propTypes = {
  setShowActive: PropTypes.func,
  showActive: PropTypes.bool,
  activeAmount: PropTypes.number,
}
