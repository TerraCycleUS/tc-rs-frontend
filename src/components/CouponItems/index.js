import { FormattedMessage } from 'react-intl'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as Lock } from '../../assets/icons/lock.svg'
import classes from './CouponItems.module.scss'
import NoCoupons from '../NoCoupons'
import UnlockSuccessful from '../PopUps/UnlockSuccessful'

export default function CouponItems({
  coupons,
  setCoupons,
  currentAmount,
  setShowActive,
  setActiveCoupons,
}) {
  const [showPop, setShowPop] = useState(false)

  function unlockCoupon(id) {
    setCoupons((lastCoupons) =>
      lastCoupons.filter((coupon) => coupon.id !== id),
    )
    setActiveCoupons((lastActiveCoupons) => {
      lastActiveCoupons.push(coupons.find((coupon) => coupon.id === id))
      return lastActiveCoupons
    })
    // request coupon unlock that uses coupon id
    // open pop on status 200 from api
    // block button while request is pending
    // should amount of drop-offed products be decreased on successful coupon unlock?
    setShowPop(true)
  }

  function renderPop() {
    if (!showPop) return ''
    return (
      <UnlockSuccessful setShowPop={setShowPop} setShowActive={setShowActive} />
    )
  }

  function renderUnlocking(numItems, id) {
    if (numItems <= currentAmount)
      return (
        <button
          onClick={() => unlockCoupon(id)}
          type="button"
          className={classes.unlockBtn}
        >
          <Lock className={classes.lockIcon} />
          <p className={classes.unlockText}>
            <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
          </p>
        </button>
      )
    const difference = numItems - currentAmount
    return (
      <div className="d-flex flex-column">
        <p className={classes.moreItems}>
          <FormattedMessage
            id="couponItems:Recycle"
            defaultMessage="Recycle "
          />
          <span className={classes.green}>
            {difference}
            <FormattedMessage
              id="couponItems:More"
              defaultMessage=" more items"
            />
          </span>
        </p>
        <p className={classes.moreItems}>
          <FormattedMessage
            id="couponItems:ToUnlock"
            defaultMessage="to unlock reward"
          />
        </p>
      </div>
    )
  }

  function getProgressPercentage(numItems) {
    const progress = (currentAmount / numItems) * 100
    if (progress > 100) return '100%'
    return `${progress}%`
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
              <div
                style={{ width: getProgressPercentage(numItems) }}
                className={classes.progress}
              />
              <div className={classes.itemsText}>
                {numItems}
                <FormattedMessage
                  id="couponItems:Items"
                  defaultMessage=" items"
                />
              </div>
            </div>
            {renderUnlocking(numItems, id)}
          </div>
        </div>
      ))}
      {renderPop()}
    </>
  )
}

CouponItems.propTypes = {
  coupons: PropTypes.array,
  setCoupons: PropTypes.func,
  currentAmount: PropTypes.number,
  setShowActive: PropTypes.func,
  setActiveCoupons: PropTypes.func,
}
