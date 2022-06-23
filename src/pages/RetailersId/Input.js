import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

function splitToN(str, n) {
  const result = new Array(n)
  for (let i = 0; i < n; i += 1) {
    result[i] = str[i] || ''
  }
  return result
}

export default function Input({ length: inputsLength }) {
  const numericInputs = Array.from({ length: inputsLength }, (_, i) => i)
  const [data, setData] = React.useState(
    Array.from({ length: inputsLength }, () => ''),
  )
  const refs = React.useRef([])
  refs.current = numericInputs.map((i) => refs.current[i] || React.createRef())
  const focusedIndex = React.useRef(0)
  const deltaI = React.useRef(0)

  React.useEffect(() => {
    const pos = focusedIndex.current + deltaI.current
    const nextRef = refs.current[pos]
    if (nextRef) {
      nextRef.current.focus()
    } else {
      refs.current[focusedIndex.current - deltaI.current].current.blur()
    }
  })

  const changeHandler = (e) => {
    const { value } = e.target
    const newValue = value[value.length - 1]

    if (!newValue) return
    const { id } = e.target.dataset

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
    console.log(e.target)
    const { id } = e.target.dataset
    focusedIndex.current = +id
    e.target.select()
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

  const inputs = numericInputs.map((i) => (
    <input
      key={i}
      ref={refs.current[i]}
      type="text"
      data-id={i}
      value={data[i]}
      onKeyDown={keyDownHanlder}
      onFocus={focusHandler}
      onChange={changeHandler}
    />
  ))
  return <Wrapper>{inputs}</Wrapper>
}

Input.propTypes = {
  length: PropTypes.number,
}

const Wrapper = styled.div`
  input {
    border: 1px solid;
  }
`
