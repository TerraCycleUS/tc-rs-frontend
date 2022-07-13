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
  deviceIdHandler,
}) {
  const defaultConfig = { fps: 30, qrbox: width - 80, aspectRatio: 1 }
  const config = scannerConfig || defaultConfig
  const instance = React.useRef(null)
  React.useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        const scanner = new Html5Qrcode(elementId)
        instance.current = scanner
        const id = deviceIdHandler?.(devices)
        return scanner.start(
          id || { facingMode: 'environment' },
          config,
          successHandler,
          errorHandler,
        )
      })
      .then(initSuccessHanlder)
      .catch(initErrorHandler)

    return () =>
      instance.current?.stop().then(stopSuccessHandler).catch(stopErrorHandler)
  }, [])

  return instance.current
}

export default function Scanner({
  width = window.innerWidth,
  padding = 16,
  successHandler,
  scannerConfig,
  errorHandler,
  initSuccessHanlder,
  initErrorHandler = console.log,
  stopSuccessHandler = console.log,
  stopErrorHandler = console.log,
  deviceIdHandler,
}) {
  const W = width - padding * 2
  useScanner({
    width: W,
    successHandler,
    scannerConfig,
    errorHandler,
    initSuccessHanlder,
    initErrorHandler,
    elementId: 'scanner',
    stopSuccessHandler,
    stopErrorHandler,
    deviceIdHandler,
  })

  return (
    <Wrapper>
      <div id="scanner" style={{ width: W, height: W }}></div>
      <div className="aim-wrapper" style={{ width: W, height: W }}>
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
  deviceIdHandler: PropTypes.func,
}

const Wrapper = styled.div`
  position: relative;

  #scanner {
    margin: auto;
    border-radius: 20px;
    overflow: hidden;
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
