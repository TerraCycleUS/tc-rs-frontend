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
import formatDate from '../../utils/formatDate'

export default function CouponItems({
  coupons,
  setActiveCoupons,
  setShowPop,
  availableAmount,
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
        // maybe coupons should be deleted after unlocking then
        // in that case add unlocked coupon to active
        return http.get('/api/coupon/my-coupons', config)
      })
      .then((response) => {
        setActiveCoupons(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function renderUnlocking(requiredAmount, id) {
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

  function getProgressPercentage(requiredAmount) {
    const progress = (availableAmount / requiredAmount) * 100
    if (progress > 100) return '100%'
    return `${progress}%`
  }

  if (!coupons?.length) return <NoCoupons />
  return (
    <>
      {coupons.map(
        ({ id, discount, name, brandLogo, startDate, requiredAmount }) => (
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
              {formatDate(startDate)}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className={classes.numberItems}>
                <div
                  style={{
                    width: getProgressPercentage(requiredAmount),
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
              {renderUnlocking(requiredAmount, id)}
            </div>
          </div>
        ),
      )}
    </>
  )
}

CouponItems.propTypes = {
  coupons: PropTypes.array,
  setActiveCoupons: PropTypes.func,
  setShowPop: PropTypes.func,
  availableAmount: PropTypes.number,
}
