import classNames from 'classnames'
import React from 'react'
import styled from 'styled-components'

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
    <Wrapper
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
    </Wrapper>
  )
}

BackdropMessage.propTypes = Message.propTypes

const Wrapper = styled(Backdrop)`
  @media (min-width: 768px) {
    .message {
      .message-content {
        margin: 0 25px;
      }
    }
  }
`
