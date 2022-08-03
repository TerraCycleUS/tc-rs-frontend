import { FormattedMessage } from 'react-intl'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classes from '../CouponItems/CouponItems.module.scss'
import landingClasses from '../../pages/CouponLanding/CouponLanding.module.scss'
import { ReactComponent as Lock } from '../../assets/icons/lock.svg'
import http from '../../utils/http'

export default function RenderUnlocking({
  requiredAmount,
  id,
  availableAmount,
  setShowPop,
}) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  if (requiredAmount <= availableAmount)
    return (
      <button
        onClick={() => UnlockCoupon({ id, navigate, user, config, setShowPop })}
        type="button"
        className={classNames(classes.unlockBtn, classes.forLanding)}
      >
        <Lock className={classes.lockIcon} />
        <p className={classes.unlockText}>
          <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
        </p>
      </button>
    )
  let currentAmount = 0
  if (availableAmount) currentAmount = availableAmount
  const difference = requiredAmount - currentAmount
  return (
    <div className={classNames('d-flex flex-column', landingClasses.needMore)}>
      <p className={classes.moreItems}>
        <FormattedMessage id="couponItems:Recycle" defaultMessage="Recycle " />
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

RenderUnlocking.propTypes = {
  requiredAmount: PropTypes.number,
  id: PropTypes.number,
  availableAmount: PropTypes.number,
  setShowPop: PropTypes.func,
}

export function UnlockCoupon({ id, navigate, user, config, setShowPop }) {
  if (!user?.retailerId) {
    navigate('/registration/retailers-id')
    return
  }

  http
    .post('/api/coupon/activate', { id }, config)
    // TODO delete this comments before push and commit
    // .post('/api/coupon/eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', { id }, config)
    .then(() => {
      setShowPop(true)
    })
    .catch((error) => {
      console.log(error)
    })
}
