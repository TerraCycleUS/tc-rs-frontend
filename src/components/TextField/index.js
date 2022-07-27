import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Label, TextError } from '../Text'

export default function TextField({
  label,
  id,
  input,
  disabled,
  error,
  className,
  adornment = null,
}) {
  const [active, setActive] = React.useState(false)

  let labelContent = null

  if (label) {
    labelContent = <Label htmlFor={id}>{label}</Label>
  }

  return (
    <Wrapper
      className={classNames('text-field', className, {
        active,
        disabled,
        error,
      })}
    >
      {labelContent}
      <div className="input-wrapper">
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
        {adornment}
      </div>
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
  className: PropTypes.string,
  adornment: PropTypes.node,
}

const Wrapper = styled.div`
  &.disabled {
    opacity: 0.5;
  }

  .input-wrapper {
    position: relative;
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
      caret-color: ${theme.textPrimary};
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
