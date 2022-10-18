import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './Unmasker.module.scss'
import { ReactComponent as Eye } from '../../../assets/icons/password-mask.svg'

export default function Unmasker({ onClick, isMasked }) {
  return (
    <button
      type="button"
      className={classNames({ isMasked }, classes.wrapper)}
      onClick={onClick}
    >
      <Eye />
    </button>
  )
}

Unmasker.propTypes = {
  onClick: PropTypes.func,
  isMasked: PropTypes.bool,
}
