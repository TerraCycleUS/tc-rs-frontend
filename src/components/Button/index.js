import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Button.module.scss'

export default function Button({
  children,
  type,
  onClick,
  disabled,
  className,
  customContent = false,
  inverted = false,
  ...rest
}) {
  let content = children

  if (!customContent) {
    content = (
      <span className="button-content fw-bold text-white">{children}</span>
    )
  }

  return (
    <button
      type={type} // eslint-disable-line
      className={classNames(
        'main-button',
        'd-block',
        'w-100',
        'text-center',
        'my-bg-color-main',
        className,
        { inverted },
        classes.wrapper,
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  customContent: PropTypes.bool,
  inverted: PropTypes.bool,
  className: PropTypes.string,
}
