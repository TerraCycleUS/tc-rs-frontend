import { useApiErrorContext } from '../context/apiError'
import { useMessageContext } from '../context/message'
import extractErrorMessage from './extractErrorMessage'

const defaultConfig = { message: true, retry: true }

export default function useApiCall() {
  const [, setConfig] = useApiErrorContext()
  const [, updateMessage] = useMessageContext()

  async function f(
    promise,
    successCb,
    errorCb,
    finalCb,
    config = defaultConfig,
  ) {
    const res = [null, null]
    try {
      const result = await promise()
      successCb?.(result)
      res[0] = result
    } catch (err) {
      let conf = { ...defaultConfig, ...config }
      if (typeof config === 'function') {
        conf = { ...defaultConfig, ...config(err) }
      }
      if (err.code === 'ERR_NETWORK' && conf.retry) {
        setConfig({
          onRetry: () => {
            setConfig(null)
            f(promise, successCb, errorCb, finalCb, config)
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
