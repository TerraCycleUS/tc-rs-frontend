import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import classes from './Button.module.scss'

export default function LogInButton({ href, className, children }) {
  return (
    <a className={classNames(classes.logInButton, className)} href={href}>
      {children}
    </a>
  )
}

LogInButton.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.string,
}
