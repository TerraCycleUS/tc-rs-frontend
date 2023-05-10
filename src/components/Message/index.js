import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import classes from './Message.module.scss'

export default function Message({
  type = 'success',
  children,
  onClose,
  customContent = false,
  className,
}) {
  let content = children

  if (!customContent) {
    content = <span className="message-content px-4">{children}</span>
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={classNames(classes.messageWrapper, 'message', type, className)}
      onClick={(e) => e.stopPropagation()}
    >
      {content}
      <button onClick={onClose} type="button" className="close">
        {onClose ? <Close /> : null}
      </button>
    </div>
  )
}

Message.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  customContent: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
}
