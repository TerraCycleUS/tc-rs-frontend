import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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
    content = <span className="button-content">{children}</span>
  }

  return (
    <Wrapper
      type={type}
      className={classNames('main-button', className, { inverted })}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </Wrapper>
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

const Wrapper = styled.button`
  display: block;
  background-color: ${({ theme }) => theme.main};
  border-radius: 60px;
  padding: 10px 1px;
  width: 100%;
  text-align: center;

  .button-content {
    font-size: 14px;
    line-height: 21px;
    font-weight: bold;
    color: #fff;
  }

  &.no-bg-btn {
    background-color: transparent;
    width: fit-content;
    padding: 0;
    .button-content {
      color: ${({ theme }) => theme.main};
      line-height: 24px;
    }
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabled};

    .button-content {
      color: ${({ theme }) => theme.disabledText};
    }
  }

  &.inverted {
    background-color: #fff;
    padding: 8px 0;
    ${({ theme }) => `
      border: 2px solid ${theme.main};
      
      .button-content {
        color:  ${theme.main};
      }
    `}
  }
`
