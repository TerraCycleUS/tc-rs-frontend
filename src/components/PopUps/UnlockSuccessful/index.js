import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import { ReactComponent as Rewards } from '../../../assets/icons/rewards.svg'
import { ReactComponent as ForwardArrow } from '../../../assets/icons/forward-arrow-right.svg'
import classes from './UnlockSuccessful.module.scss'

export default function UnlockSuccessful({ setShowPop, setShowActive }) {
  function toMyRewards() {
    setShowActive(true)
    setShowPop(false)
  }

  return (
    <PopWrapper>
      <PopContainer>
        <Xmark onClick={() => setShowPop(false)} className="close-btn" />
        <h2 className={classNames('my-text-h2', classes.heading)}>
          <FormattedMessage
            id="UnlockSuccessful:Title"
            defaultMessage="Unlocked successfully!"
          />
        </h2>
        <Rewards />

        <p className={classes.text}>
          <FormattedMessage
            id="UnlockSuccessful:Text"
            defaultMessage="Your coupon will be available in your M’ Monoprix app from next month."
          />
        </p>

        <button
          className={classes.button}
          type="button"
          onClick={() => toMyRewards()}
        >
          <span className={classes.buttonText}>
            <FormattedMessage
              id="UnlockSuccessful:Button"
              defaultMessage="My rewards"
            />
          </span>
          <ForwardArrow />
        </button>
      </PopContainer>
    </PopWrapper>
  )
}

UnlockSuccessful.propTypes = {
  setShowPop: PropTypes.func,
  setShowActive: PropTypes.func,
}
