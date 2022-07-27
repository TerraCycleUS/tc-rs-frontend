import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import classes from './Loader.module.scss'

export default function Loader({ size = 20, className }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size * (5 / 48)}px`,
      }}
      className={classNames(classes.loader, className)}
    ></div>
  )
}

Loader.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
}
