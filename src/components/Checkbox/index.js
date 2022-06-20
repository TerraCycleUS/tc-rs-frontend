import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ReactComponent as Check } from '../../assets/icons/check.svg'
import { TextError } from '../Text'

export default function Checkbox({ input, id, children, error }) {
  const { checked } = input

  return (
    <Wrapper checked={checked} className={classNames('checkbox', { checked })}>
      <div className="input-row">
        <input {...input} type="checkbox" id={id} />
        <button type="button" className="check-button">
          <label htmlFor={id}>
            <Check />
          </label>
        </button>
        <div className="checkbox-content">{children}</div>
      </div>
      {error ? <TextError className="error">{error}</TextError> : null}
    </Wrapper>
  )
}

Checkbox.propTypes = {
  input: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  error: PropTypes.string,
}

const Wrapper = styled.div`
  input {
    display: none;
  }

  .input-row {
    display: flex;
  }

  .check-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: block;
    background-color: ${({ theme }) => theme.grey};
    flex-shrink: 0;
    margin-right: 8px;
    position: relative;

    label {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      display: none;
    }
  }

  input:checked + .check-button {
    background-color: ${({ theme }) => theme.main};

    svg {
      display: block;
    }
  }
`
