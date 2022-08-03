import { FormattedMessage } from 'react-intl'
import React, { useEffect, useState } from 'react'
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
  forLanding,
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
      <CanBeUnlocked
        id={id}
        navigate={navigate}
        user={user}
        config={config}
        setShowPop={setShowPop}
        forLanding={forLanding}
      />
    )
  return (
    <CannotBeUnlocked
      availableAmount={availableAmount}
      requiredAmount={requiredAmount}
      forLanding={forLanding}
    />
  )
}

RenderUnlocking.propTypes = {
  requiredAmount: PropTypes.number,
  id: PropTypes.number,
  availableAmount: PropTypes.number,
  setShowPop: PropTypes.func,
  forLanding: PropTypes.bool,
}

export function UnlockCoupon({ id, navigate, user, config, setShowPop }) {
  if (!user?.retailerId) {
    navigate('/registration/retailers-id')
    return
  }

  http
    .post('/api/coupon/activate', { id }, config)
    .then(() => {
      setShowPop(true)
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error)
    })
}

export function CanBeUnlocked({
  id,
  navigate,
  user,
  config,
  setShowPop,
  forLanding,
}) {
  function classForLanding() {
    if (!forLanding) return ''
    return classes.forLanding
  }

  return (
    <button
      onClick={() => UnlockCoupon({ id, navigate, user, config, setShowPop })}
      type="button"
      className={classNames(classes.unlockBtn, classForLanding())}
    >
      <Lock className={classes.lockIcon} />
      <p className={classes.unlockText}>
        <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
      </p>
    </button>
  )
}

CanBeUnlocked.propTypes = {
  id: PropTypes.number,
  navigate: PropTypes.func,
  user: PropTypes.object,
  config: PropTypes.object,
  setShowPop: PropTypes.func,
  forLanding: PropTypes.bool,
}

export function CannotBeUnlocked({
  availableAmount,
  requiredAmount,
  forLanding,
}) {
  const [currentAmount, setCurrentAmount] = useState(0)
  const [difference, setDifference] = useState(0)
  function classForLanding() {
    if (!forLanding) return ''
    return landingClasses.needMore
  }

  function countDifference() {
    if (availableAmount) setCurrentAmount(availableAmount)
    setDifference(requiredAmount - currentAmount)
  }

  useEffect(() => {
    countDifference()
  }, [])

  return (
    <div className={classNames('d-flex flex-column', classForLanding())}>
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

CannotBeUnlocked.propTypes = {
  availableAmount: PropTypes.number,
  requiredAmount: PropTypes.number,
  forLanding: PropTypes.bool,
}
