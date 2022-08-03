import { useApiErrorContext } from '../context/apiError'
import { useMessageContext } from '../context/message'
import extractErrorMessage from './extractErrorMessage'

export default function useApiCall() {
  const [, setConfig] = useApiErrorContext()
  const [, updateMessage] = useMessageContext()

  async function f(promise, successCb, errorCb, finalCb) {
    try {
      const result = await promise()
      successCb?.(result)
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setConfig({
          onRetry: () => {
            setConfig(null)
            f(promise)
          },
        })
      } else {
        updateMessage({ type: 'error', text: extractErrorMessage(err) }, 10000)
      }
      errorCb?.(err)
    }

    finalCb?.()
  }

  return f
}
