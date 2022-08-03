import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import classes from './CouponLanding.module.scss'
import couponItemsClasses from '../../components/CouponItems/CouponItems.module.scss'
import getProgressPercentage from '../../utils/getProgressPercentage'
import http from '../../utils/http'
import { ReactComponent as ForwardArrowGreen } from '../../assets/icons/forward-arrow-green.svg'
import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow-right.svg'
import RenderUnlocking from '../../components/CouponUnlocking'
import UnlockSuccessful from '../../components/PopUps/UnlockSuccessful'
import getMobileOperatingSystem from '../../utils/getMobileOperatingSystem'
import LockedCouponDate from '../../components/LockedCouponDate'
import UnlockedCouponDate from '../../components/UnlockedCouponDate'

export default function CouponLanding() {
  const [droppedAmount, setDroppedAmount] = useState(0)
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const couponData = location.state
  const navigate = useNavigate()
  const [showPop, setShowPop] = useState(false)
  const [downloadLink] = useState(getMobileOperatingSystem())
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    getAvailableAmount()
  }, [])

  function getAvailableAmount() {
    http
      .get('/api/user/profile', config)
      .then((response) => {
        setDroppedAmount(response.data.availableAmount)
      })
      .catch((error) => {
        console.log(error)
      })
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
        <div
          className={classNames(
            couponItemsClasses.numberItems,
            classes.amountIndicator,
          )}
        >
          <div
            style={{
              width: getProgressPercentage(
                droppedAmount,
                couponData?.requiredAmount,
              ),
            }}
            className={couponItemsClasses.progress}
          />
          <div className={couponItemsClasses.itemsText}>
            {couponData?.requiredAmount}
            <FormattedMessage id="couponItems:Items" defaultMessage=" items" />
          </div>
        </div>
      )
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
            {couponData?.requiredAmount}
            <FormattedMessage id="couponItems:Items" defaultMessage=" items" />
          </div>
        </div>
      </div>
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

  function renderLocked() {
    return (
      <RenderUnlocking
        requiredAmount={couponData?.requiredAmount}
        id={couponData?.id}
        availableAmount={droppedAmount}
        setShowPop={setShowPop}
      />
    )
  }

  function renderUnlocked() {
    return (
      <p className={classNames(classes.linkText, 'my-text-description')}>
        <FormattedMessage
          id="couponLanding:ToUse"
          defaultMessage="To use this coupon, please go to "
        />
        <a href={downloadLink} className={classes.appLink} target="_blank">
          <FormattedMessage
            id="couponLanding:App"
            defaultMessage="Monoprix app"
          />
        </a>
      </p>
    )
  }

  function renderUsingCoupon() {
    if (!couponData?.active) return renderLocked()
    return renderUnlocked()
  }

  return (
    <div className={classes.landingPage}>
      <div
        style={{
          backgroundImage: `url(${couponData?.backgroundImage})`,
        }}
        className={classes.backGround}
      >
        <button
          className={classes.backButton}
          onClick={() => navigate(-1)}
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

          <p className={classNames(classes.text, 'my-text')}>
            {couponData?.description}
          </p>

          <div className={classes.termsWrapper}>
            <p className={classes.terms}>
              <FormattedMessage
                id="couponLanding:Terms"
                defaultMessage="Terms & conditions"
              />
            </p>
            <ForwardArrow />
          </div>
        </div>
      </div>
      {renderPop()}
    </div>
  )
}
