import classNames from 'classnames'
import React from 'react'

import Message from '.'
import Backdrop from '../Backdrop'

export default function BackdropMessage({
  type = 'success',
  children,
  onClose,
  customContent = false,
  className,
}) {
  return (
    <Backdrop
      onClick={onClose}
      className={classNames(
        'container',
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
    </Backdrop>
  )
}

BackdropMessage.propTypes = Message.propTypes
