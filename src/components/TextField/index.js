import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './TextField.scss'

export default function TextField({
  label,
  id,
  input,
  disabled,
  error,
  className,
  adornment = null,
  children,
  showErrorMessage = true,
  customError,
}) {
  const errorText = customError || (
    <span className="my-text-error  my-color-error">{error}</span>
  )

  const [active, setActive] = React.useState(false)

  let labelContent = null

  if (label) {
    labelContent = (
      <label className="my-text-label my-color-main" htmlFor={id}>
        {label}
      </label>
    )
  }

  return (
    <div
      className={classNames('text-field text-field-wrapper', className, {
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
      {error && showErrorMessage ? errorText : null}
      {children}
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.node,
  customError: PropTypes.node,
  showErrorMessage: PropTypes.bool,
  className: PropTypes.string,
  adornment: PropTypes.node,
  children: PropTypes.node,
}
