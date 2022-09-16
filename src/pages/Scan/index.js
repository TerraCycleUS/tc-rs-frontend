import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useIntl, FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'

import queryString from 'query-string'
import Scanner from '../../components/Scanner'
import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow.svg'
import classes from './Scan.module.scss'
import { useMessageContext } from '../../context/message'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'

function getErrorType(err) {
  return err.split(' : ')[0]
}

const errors = {
  NotFoundError: {
    id: 'scanError:NotFound',
    defaultMessage: 'Requested device not found',
  },
}

export default function Scan() {
  const width =
    window.innerWidth >= 768 ? window.innerWidth / 2 : window.innerWidth
  const navigate = useNavigate()
  const location = useLocation()
  const { formatMessage } = useIntl()
  const [, updateMessage] = useMessageContext()
  const scannerRef = React.useRef(null)
  const { authorization, lang } = useSelector((state) => state.user)
  const apiCall = useApiCall()
  const [qrCode, setQrCode] = useState()

  useEffect(() => {
    const params = queryString.parse(location.search)
    location.search = queryString.stringify({ ...params, qrCode })
  }, [qrCode])

  function successCb({ data }) {
    if (data.status === 'INVALID') {
      updateMessage(
        {
          type: 'error',
          text: data.errors[0],
        },
        5000,
      )
      scannerRef.current.resume()
    } else {
      updateMessage(
        {
          type: 'success',
          text: formatMessage({
            id: 'scan:Success',
            defaultMessage: 'Location successfully identified',
          }),
          onClose: () =>
            navigate({ pathname: '/drop-off', search: location.search }),
        },
        5000,
      )
    }
  }

  function errorCb() {
    scannerRef.current.resume()
  }

  function sendCode(code) {
    setQrCode(code)
    apiCall(
      () =>
        http.get('/api/qr/verification', {
          params: { code, lang },
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }),
      successCb,
      errorCb,
    )
  }

  return (
    <div
      className={classNames(
        'scan-page-wrapper container',
        classes.wrapper,
        'hide-on-exit',
      )}
    >
      <button type="button" onClick={() => navigate(-1)}>
        <ForwardArrow className="w-100 h-100" />
      </button>
      <Scanner
        successHandler={(value) => {
          scannerRef.current.pause(true)
          sendCode(value)
        }}
        initSuccessHanlder={(ins) => {
          scannerRef.current = ins
        }}
        initErrorHandler={(err) => {
          let text = err
          try {
            text = formatMessage(errors[getErrorType(err)])
          } catch (e) {
            console.log(e) // eslint-disable-line
          }
          updateMessage({ type: 'error', text })
        }}
        width={width}
      />
      <p
        className={classNames(
          'my-text-primary text-center',
          classes.description,
        )}
      >
        <FormattedMessage
          id="scan:Description"
          defaultMessage="Please scan the second QR code on the in-store kiosk."
        />
      </p>
    </div>
  )
}
