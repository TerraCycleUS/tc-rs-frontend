import React from 'react'

export default function useMessage() {
  const [message, setMessage] = React.useState(null)

  const timerRef = React.useRef(null)

  function updateMessage(data, timeout) {
    setMessage(data)

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }

    if (timeout) {
      timerRef.current = setTimeout(clear, timeout)
    }
  }

  function clear() {
    clearTimeout(timerRef.current)
    setMessage((prev) => {
      setTimeout(prev?.onClose)
      return null
    })
  }

  return [message, updateMessage, clear]
}
