import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Text.module.scss'

export default function Text({ className, children }) {
  return <p className={classNames(classes.text, className)}>{children}</p>
}
Text.propTypes = { children: PropTypes.node, className: PropTypes.string }

export function TextPrimary({ className, children }) {
  return (
    <span className={classNames(classes.textPrimary, className)}>
      {children}
    </span>
  )
}
TextPrimary.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export function TextError({ className, children }) {
  return (
    <span className={classNames(classes.textError, className)}>{children}</span>
  )
}
TextError.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export function DescriptionText({ className, children }) {
  return (
    <p className={classNames(classes.descriptionText, className)}>{children}</p>
  )
}
DescriptionText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export function Description({ className, children }) {
  return (
    <DescriptionText className={classNames(classes.description, className)}>
      {children}
    </DescriptionText>
  )
}
Description.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export function H2({ className, children }) {
  return <h2 className={classNames(classes.heading2, className)}>{children}</h2>
}
H2.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
