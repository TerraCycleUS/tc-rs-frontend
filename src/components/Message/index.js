import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classNames from 'classnames'

import { ReactComponent as Close } from '../../assets/icons/close.svg'
import error from '../../assets/icons/error.svg'
import success from '../../assets/icons/success.svg'

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
    <Wrapper
      type={type}
      className={classNames('message', type, className)}
      onClick={(e) => e.stopPropagation()}
    >
      {content}
      <button onClick={onClose} type="button" className="close">
        {onClose ? <Close /> : null}
      </button>
    </Wrapper>
  )
}

Message.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  customContent: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
}

const Wrapper = styled.div`
  padding: 20px 16px;
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(48, 48, 48, 0.1);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
    background-color: ${({ theme, type }) => theme[type] || theme.success};
    flex-shrink: 0;
  }

  &.error::before {
    background-image: url(${error});
  }

  &.success::before {
    background-image: url(${success});
  }

  .message-content {
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
  }

  .close {
    width: 24px;
    height: 24px;
  }
`
