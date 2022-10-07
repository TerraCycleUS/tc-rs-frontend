import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import queryString from 'query-string'

import { ReactComponent as Lock } from '../../assets/icons/lock.svg'
import classes from './CouponItems.module.scss'
import NoCoupons from '../NoCoupons'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import GoToCouponLanding from '../../utils/goToCouponLanding'
import LockedCouponDate from '../LockedCouponDate'

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
  const apiCall = useApiCall()

  const successCb = (response) => {
    setActiveCoupons(response.data)
  }

  function unlockCoupon(id) {
    if (!user?.retailerId) {
      navigate({
        pathname: '/registration/retailers-id',
        search: queryString.stringify({
          fromRewards: true,
        }),
      })
      return
    }

    apiCall(
      () =>
        http.post('/api/coupon/activate', { id }, config).then(() => {
          setShowPop(true)
          return http.get('/api/coupon/my-coupons', config)
        }),
      successCb,
    )
  }

  function needMoreItemsText(difference) {
    if (difference === 1)
      return (
        <FormattedMessage
          id="couponItems:MoreSingular"
          defaultMessage="Recycle <green>{difference} more item</green> to unlock reward"
          values={{
            difference,
            green: (chunks) => <span className={classes.green}>{chunks}</span>,
          }}
        />
      )
    return (
      <FormattedMessage
        id="couponItems:More"
        defaultMessage="Recycle <green>{difference} more items</green> to unlock reward"
        values={{
          difference,
          green: (chunks) => <span className={classes.green}>{chunks}</span>,
        }}
      />
    )
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
      <div className="d-flex flex-column align-items-end">
        <p className={classes.moreItems}>{needMoreItemsText(difference)}</p>
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
        ({
          id,
          discount,
          name,
          description,
          brandLogo,
          backgroundImage,
          startDate,
          endDate,
          requiredAmount,
        }) => (
          <div className={classes.coupon} key={id}>
            <button
              data-testid="landing-btn"
              className={classes.landingBtn}
              type="button"
              onClick={() =>
                GoToCouponLanding(navigate, {
                  id,
                  name,
                  description,
                  brandLogo,
                  backgroundImage,
                  requiredAmount,
                  startDate,
                  endDate,
                  active: false,
                })
              }
            >
              <div
                className={classNames(
                  classes.topPart,
                  'd-flex justify-content-between',
                )}
              >
                <p className={classes.percent}>{discount}%</p>
                <img
                  alt="brand"
                  src={brandLogo}
                  className={classes.brandLogo}
                />
              </div>
              <div>
                <p className={classes.text}>{name}</p>
              </div>
              <LockedCouponDate startDate={startDate} />
            </button>
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className={classNames(classes.numberItems, 'flex-shrink-0')}>
                <div
                  style={{
                    width: getProgressPercentage(requiredAmount),
                  }}
                  className={classes.progress}
                />
                <div className={classes.itemsText}>
                  <FormattedMessage
                    id="couponItems:Items"
                    defaultMessage="{requiredAmount} items"
                    values={{ requiredAmount }}
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
