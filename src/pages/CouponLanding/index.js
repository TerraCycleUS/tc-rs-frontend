import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import queryString from 'query-string'
import classes from './CouponLanding.module.scss'
import http from '../../utils/http'
import { ReactComponent as ForwardArrowGreen } from '../../assets/icons/forward-arrow-green.svg'
import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow-right.svg'
import RenderUnlocking from '../../components/CouponUnlocking'
import UnlockSuccessful from '../../components/PopUps/UnlockSuccessful'
import LockedCouponDate from '../../components/LockedCouponDate'
import UnlockedCouponDate from '../../components/UnlockedCouponDate'
import CouponUsing from '../../components/CouponUsing'
import ActiveCouponRequirement from '../../components/ActiveCouponRequirement'
import CouponRequirement from '../../components/CouponRequirement'
import useApiCall from '../../utils/useApiCall'
import { CARREFOUR_ID, MONOPRIX_ID } from '../../utils/const'

export default function CouponLanding() {
  const [droppedAmount, setDroppedAmount] = useState(0)
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const couponData = location.state
  const navigate = useNavigate()
  const [showPop, setShowPop] = useState(false)
  const apiCall = useApiCall()
  const params = queryString.parse(location.search)
  const retailer = couponData?.retailer || params.retailer

  useEffect(() => {
    getAvailableAmount()
  }, [])

  function backToCoupons() {
    navigate(-1, {
      state: {
        active: couponData?.active,
        retailer,
      },
    })
  }

  function getAvailableAmount() {
    if (!user) return
    apiCall(
      () => http.get('/api/user/profile'),
      (response) => {
        setDroppedAmount(response.data.availableAmount)
      },
    )
  }

  function renderPop() {
    if (!showPop) return ''
    return (
      <UnlockSuccessful setShowPop={setShowPop} landing navigate={navigate} />
    )
  }

  function renderRequiredAmount() {
    if (!couponData?.active)
      return (
        <CouponRequirement
          droppedAmount={droppedAmount}
          requiredAmount={couponData?.requiredAmount}
        />
      )
    return (
      <ActiveCouponRequirement requiredAmount={couponData?.requiredAmount} />
    )
  }

  function renderDateStatus() {
    if (!couponData?.active)
      return <LockedCouponDate startDate={couponData?.startDate} forLanding />
    return (
      <UnlockedCouponDate
        startDate={couponData?.startDate}
        endDate={couponData?.endDate}
        forLanding
      />
    )
  }

  function renderUsingCoupon() {
    if (!couponData?.active)
      return (
        <RenderUnlocking
          requiredAmount={couponData?.requiredAmount}
          id={couponData?.id}
          availableAmount={droppedAmount}
          setShowPop={setShowPop}
          forLanding
        />
      )
    return renderDescription(retailer)
  }

  return (
    <div className={classNames(classes.landingPage, 'hide-on-exit')}>
      <div
        style={{
          backgroundImage: `url(${couponData?.backgroundImage})`,
        }}
        className={classes.backGround}
      >
        <button
          className={classes.backButton}
          onClick={() => backToCoupons()}
          type="button"
        >
          <ForwardArrowGreen />
        </button>
      </div>
      <div className={classes.landingWrapper}>
        <div className={classes.landingBody}>
          {renderRequiredAmount()}
          <h3 className={classes.title}>{couponData?.name}</h3>
          {renderDateStatus()}
          {renderUsingCoupon()}
          <img
            alt="brand"
            src={couponData?.brandLogo}
            className={classes.brandLogo}
          />

          <div
            dangerouslySetInnerHTML={{ __html: couponData?.description }}
            className={classNames(classes.text, 'my-text')}
          />

          <Link
            to="/profile/terms"
            data-testid="terms-and-conditions"
            className={classes.termsWrapper}
          >
            <p className={classes.terms}>
              <FormattedMessage
                id="couponLanding:Terms"
                defaultMessage="Terms & conditions"
              />
            </p>
            <ForwardArrow />
          </Link>
        </div>
      </div>
      {renderPop()}
    </div>
  )
}

function renderDescription(retailer) {
  switch (retailer) {
    case MONOPRIX_ID:
      return <CouponUsing />

    case CARREFOUR_ID:
      return (
        <p
          className={classNames(
            'my-text-description my-color-textSecondary text-center',
            classes.carrefourDesc,
          )}
        >
          <FormattedMessage
            id="couponLanding:CarrefourDesc"
            defaultMessage="To use this coupon, scan it at the checkout of your participating store."
          />
        </p>
      )

    default:
      return null
  }
}
