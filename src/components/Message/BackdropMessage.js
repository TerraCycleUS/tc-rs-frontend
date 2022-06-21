import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
      className={`container backdrop-message-${className}`}
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

BackdropMessage.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  customContent: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
}

const Wrapper = styled(Backdrop)`
  display: flex;
  justify-content: center;
  align-items: center;

  .message {
    width: 100%;
  }
`
