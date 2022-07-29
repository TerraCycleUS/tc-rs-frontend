import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as Lock } from '../../assets/icons/lock.svg'
import classes from './CouponItems.module.scss'
import NoCoupons from '../NoCoupons'

export default function CouponItems({ coupons, setShowPop }) {
  function unlockCoupon(id) {
    setShowPop(true)
    console.log(id)
    // request coupon unlock that uses coupon id
    // open pop on status 200 from api
    // block button while request is pending
    // should amount of drop-offed products be decreased on successful coupon unlock?
  }

  if (!coupons?.length) return <NoCoupons />
  return (
    <>
      {coupons.map(({ id, percent, text, brandLogo, date, numItems }) => (
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
          <p className={classNames('my-text', classes.available)}>
            <FormattedMessage
              id="couponItems:Available"
              defaultMessage="Available from: "
            />
            {date}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className={classes.numberItems}>
              {numItems}
              <FormattedMessage
                id="couponItems:Items"
                defaultMessage=" items"
              />
            </div>
            <button
              onClick={() => unlockCoupon(id)}
              type="button"
              className={classes.unlockBtn}
            >
              <Lock className={classes.lockIcon} />
              <p className={classes.unlockText}>
                <FormattedMessage
                  id="couponItems:Unlock"
                  defaultMessage="Unlock"
                />
              </p>
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

CouponItems.propTypes = {
  coupons: PropTypes.array,
  setShowPop: PropTypes.func,
}
