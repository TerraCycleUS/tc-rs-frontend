import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactComponent as Lock } from '../../assets/icons/lock.svg'
import classes from './CouponItems.module.scss'
import NoCoupons from '../NoCoupons'
import http from '../../utils/http'

export default function CouponItems({
  coupons,
  setCoupons,
  setActiveCoupons,
  setShowPop,
}) {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  function unlockCoupon(id) {
    if (!user?.retailerId) {
      navigate('/registration/retailers-id')
    }

    http
      .post('/api/coupon/activate', { id }, config)
      .then(() => {
        setShowPop(true)
        setCoupons((lastCoupons) =>
          lastCoupons.filter((coupon) => coupon.id !== id),
        )
        setActiveCoupons((lastActiveCoupons) => {
          lastActiveCoupons.push(coupons.find((coupon) => coupon.id === id))
          return lastActiveCoupons
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function convertDate(dateString) {
    const newDate = new Date(dateString)
    const date = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    return `${date}.${month}.${year}`
  }

  function renderUnlocking(requiredAmount, id, availableAmount) {
    if (requiredAmount <= availableAmount)
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
    const difference = requiredAmount - availableAmount
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

  function getProgressPercentage(requiredAmount, availableAmount) {
    const progress = (availableAmount / requiredAmount) * 100
    if (progress > 100) return '100%'
    return `${progress}%`
  }

  if (!coupons?.length) return <NoCoupons />
  return (
    <>
      {coupons.map(
        ({
          id,
          discount,
          name,
          brandLogo,
          startDate,
          requiredAmount,
          availableAmount,
        }) => (
          <div className={classes.coupon} key={id}>
            <div
              className={classNames(
                classes.topPart,
                'd-flex justify-content-between',
              )}
            >
              <p className={classes.percent}>{discount}%</p>
              <img alt="brand" src={brandLogo} className={classes.brandLogo} />
            </div>
            <p className={classes.text}>{name}</p>
            <p className={classNames('my-text', classes.available)}>
              <FormattedMessage
                id="couponItems:Available"
                defaultMessage="Available from: "
              />
              {convertDate(startDate)}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className={classes.numberItems}>
                <div
                  style={{
                    width: getProgressPercentage(
                      requiredAmount,
                      availableAmount,
                    ),
                  }}
                  className={classes.progress}
                />
                <div className={classes.itemsText}>
                  {requiredAmount}
                  <FormattedMessage
                    id="couponItems:Items"
                    defaultMessage=" items"
                  />
                </div>
              </div>
              {renderUnlocking(requiredAmount, id, availableAmount)}
            </div>
          </div>
        ),
      )}
    </>
  )
}

CouponItems.propTypes = {
  coupons: PropTypes.array,
  setCoupons: PropTypes.func,
  setActiveCoupons: PropTypes.func,
  setShowPop: PropTypes.func,
}
