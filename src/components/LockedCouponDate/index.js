import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import couponItemsClasses from '../CouponItems/CouponItems.module.scss'
import formatDate from '../../utils/formatDate'

export default function LockedCouponDate({ endDate, forLanding }) {
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
        defaultMessage="{endDate}"
        values={{ endDate: formatDate(endDate) }}
      />
    </p>
  )
}

LockedCouponDate.propTypes = {
  endDate: PropTypes.string,
  forLanding: PropTypes.bool,
}
