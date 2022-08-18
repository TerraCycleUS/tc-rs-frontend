import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Page from '../../Layouts/Page'
import classes from './ContactUs.module.scss'
import StyledSelect from '../../components/StyledSelect'
import Button from '../../components/Button'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import { useMessageContext } from '../../context/message'
import StyledRecycleSave from '../../components/Icons/StyledRecycleSave'
import TextField from '../../components/TextField'

export default function ContactUs() {
  const { formatMessage } = useIntl()
  const [topic, setTopic] = useState()
  const [topicActive, setTopicActive] = useState(false)
  const [storeName, setStoreName] = useState('')
  const [message, setMessage] = useState()
  const [messageActive, setMessageActive] = useState(false)
  const [blockBtn, setBlockBtn] = useState(true)
  const [categories, setCategories] = useState([])
  const getCategoryApiCall = useApiCall()
  const apiCall = useApiCall()
  const user = useSelector((state) => state.user)
  const [, updateMessage] = useMessageContext()
  const navigate = useNavigate()

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    getCategoryApiCall(
      () => http.get('/api/service/contact-categories', config),
      (response) => {
        setCategories(response.data)
      },
    )
  }, [])

  useEffect(() => {
    if (message && topic) setBlockBtn(false)
    else setBlockBtn(true)
  }, [message, topic])

  function submitProblem() {
    setBlockBtn(true)
    const body = storeName ? storeName.concat('\n\n', message) : message
    apiCall(
      () =>
        http.post(
          '/api/service/contact-us-form',
          { categoryId: topic.value, body },
          config,
        ),
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

  function topicIsActive() {
    if (!topicActive) return ''
    return classes.active
  }

  function messageIsActive() {
    if (!messageActive) return ''
    return classes.active
  }

  return (
    <Page footer>
      <StyledRecycleSave className={classes.icon} />
      <label
        className={classNames(classes.label, topicIsActive())}
        htmlFor="topic"
      >
        <FormattedMessage id="contactUs:Topic" defaultMessage="Topic" />
      </label>
      <StyledSelect
        className={classes.select}
        options={categories?.map(({ id, title }) => ({
          value: id,
          label: title,
        }))}
        placeholder="Suggestion"
        id="topic"
        value={topic}
        onChange={(topicObject) => setTopic(topicObject)}
        onFocus={() => {
          setTopicActive(true)
        }}
        onBlur={() => {
          setTopicActive(false)
        }}
      />
      <TextField
        id="store-name"
        className={classes.storeField}
        label={formatMessage({
          id: 'contactUs:Store',
          defaultMessage: 'Store name',
        })}
        input={{
          value: storeName,
          onChange: (event) => setStoreName(event.target.value),
        }}
      />
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

      <Button disabled={blockBtn} type="button" onClick={() => submitProblem()}>
        <FormattedMessage id="contactUs:Send" defaultMessage="Send" />
      </Button>
    </Page>
  )
}
