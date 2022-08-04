import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import couponItemsClasses from '../CouponItems/CouponItems.module.scss'
import formatDate from '../../utils/formatDate'

export default function LockedCouponDate({ startDate, forLanding }) {
  function getClassForLanding() {
    if (!forLanding) return ''
    return couponItemsClasses.landing
  }

  return (
    <p
      className={classNames(
        'my-text',
        couponItemsClasses.available,
        getClassForLanding(),
      )}
    >
      <FormattedMessage
        id="couponItems:Available"
        defaultMessage="Available from: {startDate}"
        values={{ startDate: formatDate(startDate) }}
      />
    </p>
  )
}

LockedCouponDate.propTypes = {
  startDate: PropTypes.string,
  forLanding: PropTypes.bool,
}
