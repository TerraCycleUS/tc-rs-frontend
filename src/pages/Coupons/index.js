import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import http from '../../utils/http'
import Page from '../../Layouts/Page'
import classes from './Coupons.module.scss'
import CouponPanel from '../../components/CouponPanel'
import CouponItems from '../../components/CouponItems'
import ActiveCouponItems from '../../components/ActiveCouponItems'
import UnlockSuccessful from '../../components/PopUps/UnlockSuccessful'

export default function Coupons() {
  const [coupons, setCoupons] = useState([])
  const [activeCoupons, setActiveCoupons] = useState([])
  const [showActive, setShowActive] = useState(false)
  const user = useSelector((state) => state.user)
  const [droppedAmount, setDroppedAmount] = useState(0)
  const [showPop, setShowPop] = useState(false)
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    http
      .get('/api/coupon', config)
      .then((response) => {
        setCoupons(response.data)
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line
      })

    http
      .get('/api/coupon/my-coupons', config)
      .then((response) => {
        setActiveCoupons(response.data)
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line
      })
  }, [])

  useEffect(() => {
    if (!showPop) return
    getAvailableAmount()
  }, [showPop])

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
        console.log(error) // eslint-disable-line
      })
  }

  function renderPop() {
    if (!showPop) return ''
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
          {droppedAmount}
          <FormattedMessage
            id="coupons:Recycled"
            defaultMessage=" items recycled"
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
