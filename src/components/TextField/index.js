import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { TextError } from '../Text'

export default function TextField({ label, id, input, disabled, error }) {
  const [active, setActive] = React.useState(false)

  let labelContent = null

  if (label) {
    labelContent = <label htmlFor={id}>{label}</label>
  }

  return (
    <Wrapper className={classNames('text-field', { active, disabled, error })}>
      {labelContent}
      <input
        {...input}
        id={id}
        onFocus={(e) => {
          setActive(true)
          return input.onFocus?.(e)
        }}
        onBlur={(e) => {
          setActive(false)
          return input.onBlur?.(e)
        }}
        disabled={disabled}
      />
      {error ? <TextError className="error">{error}</TextError> : null}
    </Wrapper>
  )
}

TextField.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.node,
}

const Wrapper = styled.div`
  &.disabled {
    opacity: 0.5;
  }

  input {
    display: block;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    width: 100%;
    border-radius: 30px;
    padding: 9px 22px;
    border-color: transparent;
    border-width: 2px;
    border-style: solid;
    ${({ theme }) => `
      color: ${theme.textPrimary};
      background-color: ${theme.secondary};

      &::placeholder {
        color: ${theme.textSecondary}
      }

      &:focus {
        border-color: ${theme.textSecondary};
      }
    `}
  }

  label {
    display: block;
    font-weight: bold;
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.main};
  }

  &.active {
    label {
      color: ${({ theme }) => theme.terraGreen};
    }
  }

  &.error {
    input {
      border-color: ${({ theme }) => theme.error};
    }

    label {
      color: ${({ theme }) => theme.error};
    }
  }
`
