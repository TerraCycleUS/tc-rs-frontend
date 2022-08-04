import { useApiErrorContext } from '../context/apiError'
import { useMessageContext } from '../context/message'
import extractErrorMessage from './extractErrorMessage'

export default function useApiCall() {
  const [, setConfig] = useApiErrorContext()
  const [, updateMessage] = useMessageContext()

  async function f(
    promise,
    successCb,
    errorCb,
    finalCb,
    config = { message: true, retry: true },
  ) {
    const res = [null, null]
    try {
      const result = await promise()
      successCb?.(result)
      res[0] = result
    } catch (err) {
      let conf = config
      if (typeof config === 'function') {
        conf = config(err)
      }
      if (err.code === 'ERR_NETWORK' && conf.retry) {
        setConfig({
          onRetry: () => {
            setConfig(null)
            f(promise)
          },
        })
      } else if (conf.message) {
        updateMessage({ type: 'error', text: extractErrorMessage(err) }, 10000)
      }
      errorCb?.(err)
      res[1] = err
    }

    finalCb?.()
    return res
  }

  return f
}
