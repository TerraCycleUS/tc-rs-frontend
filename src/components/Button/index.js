import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Button.module.scss'

function Wrapper({ as = 'button', children, ...rest }) {
  return React.createElement(as, rest, children)
}

export default function Button({
  children,
  onClick,
  className,
  customContent = false,
  inverted = false,
  ...rest
}) {
  let content = children

  if (!customContent) {
    content = <span className="button-content fw-bold">{children}</span>
  }

  return (
    <Wrapper
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
      {...rest}
    >
      {content}
    </Wrapper>
  )
}

Wrapper.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  customContent: PropTypes.bool,
  inverted: PropTypes.bool,
  className: PropTypes.string,
}
