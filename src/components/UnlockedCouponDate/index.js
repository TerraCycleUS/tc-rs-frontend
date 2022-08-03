import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import classes from '../CouponItems/CouponItems.module.scss'
import formatDate from '../../utils/formatDate'

export default function UnlockedCouponDate({ startDate, endDate, forLanding }) {
  function checkIfDueDate() {
    const dateObj = new Date(startDate)
    const todaysDate = new Date()
    return todaysDate >= dateObj
  }

  function getClassForLanding() {
    if (!forLanding) return ''
    return classes.landing
  }

  if (!checkIfDueDate(startDate))
    return <Waiting startDate={startDate} landingClass={getClassForLanding()} />
  return <Active endDate={endDate} landingClass={getClassForLanding()} />
}

UnlockedCouponDate.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  forLanding: PropTypes.bool,
}

export function Waiting({ startDate, landingClass }) {
  return (
    <p className={classNames('my-text', classes.available, landingClass)}>
      <FormattedMessage
        id="activeCouponItems:Waiting"
        defaultMessage="In waiting | Available from: "
      />
      {formatDate(startDate)}
    </p>
  )
}

Waiting.propTypes = {
  startDate: PropTypes.string,
  landingClass: PropTypes.string,
}

export function Active({ endDate, landingClass }) {
  return (
    <p
      className={classNames(
        'my-text',
        classes.available,
        classes.active,
        landingClass,
      )}
    >
      <FormattedMessage
        id="activeCouponItems:Active"
        defaultMessage="Active | Valid until: "
      />
      {formatDate(endDate)}
    </p>
  )
}

Active.propTypes = {
  endDate: PropTypes.string,
  landingClass: PropTypes.string,
}
