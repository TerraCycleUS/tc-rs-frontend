import classNames from 'classnames'
import React from 'react'

import Message from '.'
import classes from './Message.module.scss'

export default function BackdropMessage({
  type = 'success',
  children,
  onClose,
  customContent = false,
  className,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={onClose}
      className={classNames(
        classes.backDrop,
        'd-flex',
        'justify-content-center',
        'align-items-center',
        { [`backdrop-message-${className}`]: className },
      )}
    >
      <Message
        customContent={customContent}
        type={type}
        className={className}
        onClose={onClose}
      >
        {children}
      </Message>
    </div>
  )
}

BackdropMessage.propTypes = Message.propTypes
