import React from 'react'
import styled from 'styled-components'

const numericInputs = Array.from({ length: 6 }, (_, i) => i)

export default function Input() {
  const [data, setData] = React.useState(Array.from({ length: 6 }, () => ''))
  const refs = React.useRef([])
  refs.current = numericInputs.map((i) => refs.current[i] || React.createRef())
  const focusedIndex = React.useRef(0)
  const joined = data.join('')
  const len = joined.length

  React.useEffect(() => {
    const nextRef = refs.current[len]
    if (nextRef) {
      nextRef.current.focus()
    } else {
      refs.current[len - 1].current.blur()
    }
  }, [joined])

  const changeHandler = (e) => {
    const index = focusedIndex.current !== len ? focusedIndex.current : len
    const { value } = e.target
    const newValue = value[value.length - 1]
    setData((prev) => {
      const newData = prev.slice()
      newData[index] = newValue
      return newData
    })
  }

  const focusHandler = (e) => {
    const { id } = e.target.dataset
    focusedIndex.current = +id
    e.target.select()
  }

  const keyDownHanlder = (e) => {
    if (e.key === 'Backspace') {
      setData((prev) => {
        const newData = prev.slice()
        newData[Math.max(0, len - 1)] = ''
        return newData
      })
    }
  }
  console.log(focusedIndex)
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

const Wrapper = styled.div`
  input {
    border: 1px solid;
  }
`
