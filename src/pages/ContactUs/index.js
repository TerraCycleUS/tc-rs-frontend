import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Page from '../../Layouts/Page'
import classes from './ContactUs.module.scss'
import Button from '../../components/Button'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import { useMessageContext } from '../../context/message'
import StyledRecycleSave from '../../components/Icons/StyledRecycleSave'

export default function ContactUs() {
  const { formatMessage } = useIntl()
  const [message, setMessage] = useState()
  const [messageActive, setMessageActive] = useState(false)
  const [blockBtn, setBlockBtn] = useState(true)
  const apiCall = useApiCall()
  const [, updateMessage] = useMessageContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (message) setBlockBtn(false)
    else setBlockBtn(true)
  }, [message])

  function submitProblem() {
    setBlockBtn(true)
    apiCall(
      () =>
        http.post('/api/service/contact-us-form', {
          body: message,
        }),
      successCb,
      errorCb,
    )
  }

  const successCb = () => {
    setBlockBtn(false)
    updateMessage({
      type: 'success',
      text: (
        <FormattedMessage
          id="contactUs:Success"
          defaultMessage="Your message was successfully sent!"
        />
      ),
      onClose: () => navigate('/profile'),
    })
  }

  const errorCb = (error) => {
    setBlockBtn(false)
    updateMessage({
      type: 'error',
      text: error.response.data.errors,
    })
  }

  function messageIsActive() {
    if (!messageActive) return ''
    return classes.active
  }

  return (
    <Page footer>
      <StyledRecycleSave className={classes.icon} />
      <label
        className={classNames(classes.label, messageIsActive())}
        htmlFor="message"
      >
        <FormattedMessage id="contactUs:Message" defaultMessage="Message" />
      </label>
      <textarea
        id="message"
        className={classes.textArea}
        placeholder={formatMessage({
          id: 'contactUs:TypeHere',
          defaultMessage: 'Type here ...',
        })}
        onChange={(event) => setMessage(event.target.value)}
        value={message}
        maxLength="1000"
        onFocus={() => {
          setMessageActive(true)
        }}
        onBlur={() => {
          setMessageActive(false)
        }}
      />

      <Button
        className={classes.sendBtn}
        disabled={blockBtn}
        type="button"
        onClick={() => submitProblem()}
      >
        <FormattedMessage id="contactUs:Send" defaultMessage="Send" />
      </Button>
    </Page>
  )
}
