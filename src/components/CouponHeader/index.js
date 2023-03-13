import React from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import classes from './CouponHeader.module.scss'

export default function CouponHeader({ backgroundImage, brandLogo }) {
  return (
    <div
      className={classNames(
        classes.logos,
        'd-flex align-items-center justify-content-end',
      )}
    >
      <img alt="brand" src={backgroundImage} className={classes.brandLogo} />
      <span className={classes.divider}></span>
      <img alt="retailer" src={brandLogo} className={classes.brandLogo} />
    </div>
  )
}

CouponHeader.propTypes = {
  backgroundImage: propTypes.string,
  brandLogo: propTypes.string,
}
