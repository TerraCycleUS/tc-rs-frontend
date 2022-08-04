import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import http from '../../utils/http'
import Page from '../../Layouts/Page'
import classes from './Coupons.module.scss'
import CouponPanel from '../../components/CouponPanel'
import CouponItems from '../../components/CouponItems'
import ActiveCouponItems from '../../components/ActiveCouponItems'
import UnlockSuccessful from '../../components/PopUps/UnlockSuccessful'
import useApiCall from '../../utils/useApiCall'

export default function Coupons() {
  const [coupons, setCoupons] = useState([])
  const [activeCoupons, setActiveCoupons] = useState([])
  const [showActive, setShowActive] = useState(false)
  const user = useSelector((state) => state.user)
  const [droppedAmount, setDroppedAmount] = useState(0)
  const [showPop, setShowPop] = useState(false)
  const location = useLocation()
  const getCouponApiCall = useApiCall()
  const getAmountApiCall = useApiCall()
  const navigate = useNavigate()

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    if (!user) navigate('/sign-in')
  }, [])

  useEffect(() => {
    const fromLanding = location?.state
    if (fromLanding) setShowActive(fromLanding?.active)
  }, [])

  function getCoupon() {
    return Promise.all([
      http.get('/api/coupon', config),
      http.get('/api/coupon/my-coupons', config),
    ])
  }

  const couponSuccessCb = ([res1, res2]) => {
    setCoupons(res1.data)
    setActiveCoupons(res2.data)
  }

  useEffect(() => {
    getCouponApiCall(() => getCoupon(), couponSuccessCb, null, null, {
      message: false,
    })
  }, [])

  useEffect(() => {
    if (!showPop) return
    getAvailableAmount()
    getCouponApiCall(() => getCoupon(), couponSuccessCb, null, null, {
      message: false,
    })
  }, [showPop])

  useEffect(() => {
    getAvailableAmount()
  }, [])

  function getAvailableAmount() {
    getAmountApiCall(
      () => http.get('/api/user/profile', config),
      (response) => {
        setDroppedAmount(response.data.availableAmount)
      },
      null,
      null,
      { message: false },
    )
  }

  function renderPop() {
    if (!showPop) return null
    return (
      <UnlockSuccessful setShowPop={setShowPop} setShowActive={setShowActive} />
    )
  }

  function showCoupons() {
    if (showActive) return <ActiveCouponItems activeCoupons={activeCoupons} />
    return (
      <CouponItems
        coupons={coupons}
        setShowPop={setShowPop}
        setActiveCoupons={setActiveCoupons}
        availableAmount={droppedAmount}
      />
    )
  }

  return (
    <Page footer backgroundGrey className="with-animation">
      <div className={classes.couponsWrapper}>
        <h4
          className={classNames(
            classes.itemsRecycled,
            'my-text-h4 my-color-main',
          )}
        >
          <FormattedMessage
            id="coupons:Recycled"
            defaultMessage="{droppedAmount} items recycled"
            values={{ droppedAmount }}
          />
        </h4>
        <CouponPanel
          showActive={showActive}
          setShowActive={setShowActive}
          activeAmount={parseInt(activeCoupons?.length, 10)}
        />
        {showCoupons()}
      </div>
      {renderPop()}
    </Page>
  )
}
