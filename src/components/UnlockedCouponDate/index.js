import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import classes from '../CouponItems/CouponItems.module.scss'
import formatDate from '../../utils/formatDate'

export default function UnlockedCouponDate({ startDate, endDate, forLanding }) {
  function checkIfActive() {
    const dateObj = new Date(startDate)
    const todaysDate = new Date()
    return todaysDate >= dateObj
  }

  function getClassForLanding() {
    if (!forLanding) return ''
    return classes.landing
  }

  if (!checkIfActive(startDate))
    return (
      <p
        className={classNames(
          'my-text',
          classes.available,
          getClassForLanding(),
        )}
      >
        <FormattedMessage
          id="activeCouponItems:Waiting"
          defaultMessage="In waiting | Available from: "
        />
        {formatDate(startDate)}
      </p>
    )
  return (
    <p
      className={classNames(
        'my-text',
        classes.available,
        classes.active,
        getClassForLanding(),
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

UnlockedCouponDate.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  forLanding: PropTypes.bool,
}
