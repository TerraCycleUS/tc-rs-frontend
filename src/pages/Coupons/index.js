import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { css } from 'styled-components'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import createAnimationStyles from '../../components/PageTransition/createAnimationStyles'
import animations from '../../components/PageTransition/animations'
import Page from '../../Layouts/Page'
import classes from './Coupons.module.scss'
import CouponPanel from '../../components/CouponPanel'
import CouponItems from '../../components/CouponItems'

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
    text: 'Old spice macho shampoo gel toothpaste soad',
    brandLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052',
    date: '01.35.3021',
    numItems: 248,
  },
]

export default function Coupons() {
  const [coupons, setCoupons] = useState([])
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setCoupons(mockCoupons)
  }, [])

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
          {user.dropOffAmount}
          <FormattedMessage
            id="coupons:Recycled"
            defaultMessage=" items recycled"
          />
        </h4>
        <CouponPanel />
        <CouponItems coupons={coupons} currentAmount={user.dropOffAmount} />
      </div>
    </Page>
  )
}
