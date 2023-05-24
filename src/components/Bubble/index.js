import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import classes from './Bubble.module.scss'

export function Bubble({ children, className }) {
  return <div className={classNames(classes.bubble, className)}>{children}</div>
}
Bubble.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export function BubbleEnd() {
  return <div className={classes.bubbleEnd} />
}

export function BubbleContainer({ children, className }) {
  return (
    <div className={classNames(classes.bubbleContainer, className)}>
      {children}
    </div>
  )
}
BubbleContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
