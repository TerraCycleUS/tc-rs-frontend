import React from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
  hidePauseMessage,
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
        if (hidePauseMessage) {
          scanner.scannerPausedUiElement?.classList.add('d-none')
        }
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
    <Wrapper height={W}>
      <div id="scanner" style={{ width: W, height: W }}>
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
    </Wrapper>
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

const Wrapper = styled.div`
  position: relative;
  height: ${(props) => props.height}px;

  #scanner {
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
  }

  .aim-wrapper {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
  }

  .aim {
    width: 40px;
    height: 40px;
    border-style: solid;
    border-color: #fff;
    display: block;
    position: absolute;
  }

  .aim-1 {
    top: 40px;
    left: 40px;
    border-width: 5px 0 0 5px;
    border-top-left-radius: 15px;
  }

  .aim-2 {
    top: 40px;
    right: 40px;
    border-width: 5px 5px 0 0;
    border-top-right-radius: 15px;
  }

  .aim-3 {
    bottom: 40px;
    right: 40px;
    border-width: 0 5px 5px 0;
    border-bottom-right-radius: 15px;
  }

  .aim-4 {
    bottom: 40px;
    left: 40px;
    border-width: 0 0 5px 5px;
    border-bottom-left-radius: 15px;
  }

  #qr-shaded-region {
    display: none;
  }

  video {
    display: block;
  }
`
