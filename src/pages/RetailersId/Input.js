import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function splitToN(str, n) {
  const result = new Array(n)
  for (let i = 0; i < n; i += 1) {
    result[i] = str[i] || ''
  }
  return result
}

export default function Input({
  length: inputsLength,
  input = {},
  defaultValue = '',
  onChange,
  validate,
}) {
  const numericInputs = Array.from({ length: inputsLength }, (_, i) => i)
  const [data, setData] = React.useState(splitToN(defaultValue, inputsLength))
  const refs = React.useRef([])
  refs.current = numericInputs.map((i) => refs.current[i] || React.createRef())
  const focusedIndex = React.useRef(0)
  const deltaI = React.useRef(0)

  React.useEffect(() => {
    if (onChange) onChange(data.join(''))
    const pos = focusedIndex.current + deltaI.current
    const nextRef = refs.current[pos]
    if (nextRef) {
      nextRef.current.focus()
    }
    deltaI.current = 0
  })

  const changeHandler = (e) => {
    const { value } = e.target
    const newValue = value[value.length - 1]

    if (!newValue) return
    const { id } = e.target.dataset

    let isValid = true

    if (validate) isValid = validate(data.join(''), newValue, +id, e)

    if (!isValid) return

    setData((prev) => {
      const newData = prev.slice()
      newData[+id] = newValue
      const joined = newData.join('')
      if (joined.length > +id) {
        deltaI.current = 1
      } else {
        deltaI.current = 0
      }
      return splitToN(joined, inputsLength)
    })
  }

  const focusHandler = (e) => {
    e.target.dataset.focused = true
    const { id } = e.target.dataset
    focusedIndex.current = +id
    e.target.select()
  }

  const blurHandler = (e) => {
    e.target.dataset.focused = false
  }

  const keyDownHanlder = (e) => {
    if (e.key === 'Backspace') {
      const { id } = e.target.dataset
      setData((prev) => {
        const newData = prev.slice()
        newData.splice(+id, 1)
        const joined = newData.join('')
        if (joined.length <= +id) {
          deltaI.current = -1
        } else {
          deltaI.current = 0
        }
        newData.push('')
        return newData
      })
    }
  }

  const inputs = numericInputs.map((i) => {
    const config = typeof input === 'function' ? input(i) : input

    return (
      <InputElement
        {...config}
        key={i}
        ref={refs.current[i]}
        type="text"
        data-id={i}
        data-focused={false}
        value={data[i]}
        onKeyDown={keyDownHanlder}
        onFocus={focusHandler}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    )
  })
  return inputs
}

const InputElement = styled.input`
  &[data-focused='true']::placeholder {
    color: transparent !important;
  }
`

Input.propTypes = {
  length: PropTypes.number,
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.func,
}
