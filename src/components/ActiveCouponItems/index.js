import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from '../CouponItems/CouponItems.module.scss'
import NoCoupons from '../NoCoupons'

export default function ActiveCouponItems({ activeCoupons }) {
  function checkIfActive(date) {
    const dateObj = new Date(date)
    const todaysDate = new Date()
    return todaysDate >= dateObj
  }

  function renderStatus(date) {
    if (!checkIfActive(date))
      return (
        <p className={classNames('my-text', classes.available)}>
          <FormattedMessage
            id="activeCouponItems:Waiting"
            defaultMessage="In waiting | Available from: "
          />
          {date}
        </p>
      )
    return (
      <p className={classNames('my-text', classes.available, classes.active)}>
        <FormattedMessage
          id="activeCouponItems:Active"
          defaultMessage="Active | Valid until: "
        />
        {date}
      </p>
    )
  }

  if (!activeCoupons?.length) return <NoCoupons />
  return (
    <>
      {activeCoupons.map(({ id, percent, text, brandLogo, date, numItems }) => (
        <div className={classes.coupon} key={id}>
          <div
            className={classNames(
              classes.topPart,
              'd-flex justify-content-between',
            )}
          >
            <p className={classes.percent}>{percent}%</p>
            <img alt="brand" src={brandLogo} className={classes.brandLogo} />
          </div>
          <p className={classes.text}>{text}</p>
          {renderStatus(date)}
          <div className="d-flex justify-content-between align-items-center">
            <div
              className={classNames(
                classes.numberItems,
                classes.activeNumberItems,
              )}
            >
              <div className={classes.itemsText}>
                {numItems}
                <FormattedMessage
                  id="couponItems:Items"
                  defaultMessage=" items"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

ActiveCouponItems.propTypes = {
  activeCoupons: PropTypes.array,
}
