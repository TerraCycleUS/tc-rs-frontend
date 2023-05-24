import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { ReactComponent as Check } from '../../assets/icons/check.svg'
import { TextError } from '../Text'
import classes from './Checkbox.module.scss'

export default function Checkbox({ input, id, children, error, className }) {
  return (
    <div className={classNames(classes.checkboxWrap, "checkbox")}>
      <div className={classes.inputRow}>
        <input {...input} type="checkbox" id={id} />
        <button
          type="button"
          className={classNames(classes.checkButton, className)}
          tabIndex={-1}
        >
          <label htmlFor={id}>
            <Check />
          </label>
        </button>
        <div className="checkbox-content">{children}</div>
      </div>
      {error ? <TextError className="error">{error}</TextError> : null}
    </div>
  )
}

Checkbox.propTypes = {
  input: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  error: PropTypes.node,
  className: PropTypes.string,
}
