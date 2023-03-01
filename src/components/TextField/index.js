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
}) {
  let errorText = error
  let showErrorAsDescription = false
  let errorActive = !!errorText

  if (typeof error === 'object' && !(error instanceof HTMLElement)) {
    errorText = error.text
    showErrorAsDescription = error.asDescription
    errorActive = error.active
  }

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
        error: errorActive,
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
      {errorText || showErrorAsDescription ? (
        <span
          className={classNames(
            { 'my-color-error': errorActive },
            'my-text-error',
          )}
        >
          {errorText}
        </span>
      ) : null}
      {children}
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      text: PropTypes.string,
      active: PropTypes.bool,
      asDescription: PropTypes.bool,
    }),
  ]),
  className: PropTypes.string,
  adornment: PropTypes.node,
  children: PropTypes.node,
}
