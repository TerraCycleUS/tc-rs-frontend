import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { useIntl, FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'

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
    defaultMessage: 'Requested device not found, pidar',
  },
}

export default function Scan() {
  const width =
    window.innerWidth >= 768 ? window.innerWidth / 2 : window.innerWidth
  const navigate = useNavigate()
  const location = useLocation()
  const { formatMessage } = useIntl()
  const [message, updateMessage] = useMessageContext()
  const scannerRef = React.useRef(null)
  const redirectRef = React.useRef(false)
  const { authorization } = useSelector((state) => state.user)

  const apiCall = useApiCall(
    () => {
      updateMessage({
        type: 'success',
        text: formatMessage({
          id: 'scan:Success',
          defaultMessage: 'Location successfully identified',
        }),
      })
      redirectRef.current = true
    },
    () => scannerRef.current.resume(),
  )
  function sendCode(code) {
    apiCall(() =>
      http.get('/api/qr/verification', {
        params: { code },
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }),
    )
  }

  React.useEffect(() => {
    if (redirectRef.current && !message) {
      redirectRef.current = false
      navigate({ pathname: '/drop-off', search: location.search })
    }
  })

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
          defaultMessage="Please scan the QR code on the in-store kiosk."
        />
      </p>
    </div>
  )
}
