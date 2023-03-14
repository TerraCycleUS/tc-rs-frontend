import React from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Scanner.module.scss'

export function useScanner({
  width,
  scannerConfig,
  elementId,
  successHandler,
  errorHandler,
  initSuccessHanlder,
  initErrorHandler,
  stopSuccessHandler,
  stopErrorHandler,
}) {
  const destroyRef = React.useRef(false)

  const defaultConfig = {
    fps: 10,
    qrbox: width,
    aspectRatio: 1,
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true,
    },
  }
  const config = scannerConfig || defaultConfig
  const instance = React.useRef(null)
  const [initError, setInitError] = React.useState(null)
  React.useEffect(() => {
    const scanner = new Html5Qrcode(elementId, {
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true,
      },
    })
    instance.current = scanner
    scanner
      .start(
        { facingMode: 'environment' },
        config,
        successHandler,
        errorHandler,
      )
      .then(() => {
        initSuccessHanlder(scanner)
      })
      .catch((err) => {
        setInitError(err)
        initErrorHandler(err)
      })

    return () => {
      destroyRef.current = true
      try {
        instance.current
          ?.stop()
          .then(stopSuccessHandler)
          .catch(stopErrorHandler)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
        stopErrorHandler(e)
      }
    }
  }, [])

  return [instance.current, { initError }]
}

const noop = () => {}

export default function Scanner({
  width = window.innerWidth,
  padding = 16,
  successHandler,
  scannerConfig,
  errorHandler,
  initSuccessHanlder,
  initErrorHandler = noop,
  stopSuccessHandler = noop,
  stopErrorHandler = noop,
  withAim = true,
  hidePauseMessage = true,
}) {
  const W = width - padding * 2
  const [, { initError }] = useScanner({
    width: W,
    successHandler,
    scannerConfig,
    errorHandler,
    initSuccessHanlder,
    initErrorHandler,
    elementId: 'scanner',
    stopSuccessHandler,
    stopErrorHandler,
    hidePauseMessage,
  })

  // eslint-disable-next-line no-console
  console.log('trying to fix 17:43 Scanner')
  // eslint-disable-next-line no-console
  console.log('decreased fps to 10')
  return (
    <div className={classes.wrapper} style={{ height: W }}>
      <div
        id="scanner"
        className={classNames({ hidePauseMessage })}
        style={{ width: W, height: W }}
      >
        {initError ? <p>Error</p> : <p>Loading...</p>}
      </div>
      <div
        className="aim-wrapper"
        style={{ width: W, height: W, display: withAim ? 'block' : 'none' }}
      >
        <span className="aim aim-1"></span>
        <span className="aim aim-2"></span>
        <span className="aim aim-3"></span>
        <span className="aim aim-4"></span>
      </div>
    </div>
  )
}

Scanner.propTypes = {
  width: PropTypes.number,
  padding: PropTypes.number,
  successHandler: PropTypes.func.isRequired,
  scannerConfig: PropTypes.object,
  errorHandler: PropTypes.func,
  initSuccessHanlder: PropTypes.func,
  initErrorHandler: PropTypes.func,
  stopErrorHandler: PropTypes.func,
  stopSuccessHandler: PropTypes.func,
  withAim: PropTypes.bool,
  hidePauseMessage: PropTypes.bool,
}
