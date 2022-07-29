import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { css } from 'styled-components'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import createAnimationStyles from '../../components/PageTransition/createAnimationStyles'
import animations from '../../components/PageTransition/animations'
import Page from '../../Layouts/Page'
import classes from './Coupons.module.scss'
import CouponPanel from '../../components/CouponPanel'
import CouponItems from '../../components/CouponItems'
import ActiveCouponItems from '../../components/ActiveCouponItems'

const mockCoupons = [
  {
    id: 0,
    percent: 15,
    text: 'Gillette disposable razors Pack 4ct or larger',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.11.2021',
    numItems: 20,
  },
  {
    id: 1,
    percent: 8,
    text: 'Dove disposable razors Pack 4ct or larger',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.35.3021',
    numItems: 4,
  },
  {
    id: 2,
    percent: 35,
    text: 'Old spice macho shampoo gel toothpaste soad',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.35.3021',
    numItems: 500,
  },
  {
    id: 3,
    percent: 21,
    text: 'Old spice macho shampoo gel toothpaste soap',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.35.3021',
    numItems: 248,
  },
]
const mockActiveCoupons = [
  {
    id: 10,
    percent: 2,
    text: 'Dove disposable razors Pack 4ct or larger',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.10.2021',
    numItems: 20,
  },
  {
    id: 12,
    percent: 17,
    text: 'Old spice macho shampoo gel toothpaste soap',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.35.3021',
    numItems: 50,
  },
  {
    id: 13,
    percent: 15,
    text: 'efefefef efefef effff o gel toothpaste soad',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.35.3021',
    numItems: 2,
  },
]

export default function Coupons() {
  const [coupons, setCoupons] = useState([])
  const [activeCoupons, setActiveCoupons] = useState([])
  const [showActive, setShowActive] = useState(false)
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [droppedAmount, setDroppedAmount] = useState(0)

  useEffect(() => {
    if (!user?.retailerId) navigate('/registration/retailers-id')
  }, [])

  useEffect(() => {
    setCoupons(mockCoupons)
    setActiveCoupons(mockActiveCoupons)
    if (user?.dropOffAmount) setDroppedAmount(user?.dropOffAmount)
  }, [])

  function showCoupons() {
    if (showActive) return <ActiveCouponItems activeCoupons={activeCoupons} />
    return (
      <CouponItems
        coupons={coupons}
        setCoupons={setCoupons}
        currentAmount={droppedAmount}
        setShowActive={setShowActive}
        setActiveCoupons={setActiveCoupons}
      />
    )
  }

  return (
    <Page
      footer
      backgroundGrey
      className="with-animation"
      title={
        <FormattedMessage id="coupons:RewardsTitle" defaultMessage="Rewards" />
      }
      css={css`
        &.anim-enter-active .page-content {
          ${createAnimationStyles(animations.moveFromBottom)}
        }

        &.anim-exit + .add-product {
          display: none;
        }
      `}
    >
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
    </Page>
  )
}
