import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import recycleSave from '../../../assets/icons/recycle-save.png'
import classes from './StyledRecycleSave.module.scss'

export default function StyledRecycleSave({ className }) {
  return (
    <img
      src={recycleSave}
      className={classNames(className, classes.styledRecycleSave)}
      alt="recycle-save"
    />
  )
}

StyledRecycleSave.propTypes = {
  className: PropTypes.string,
}
