import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './CheckProduct.module.scss'

export default function CheckProduct({ children }) {
  const [active, setActive] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setActive(!active)}
      className={classes.checkWrapper}
    >
      {children}
    </button>
  )
}
CheckProduct.propTypes = {
  children: PropTypes.node,
}
