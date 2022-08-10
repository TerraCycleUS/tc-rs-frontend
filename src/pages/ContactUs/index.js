import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Page from '../../Layouts/Page'
import { ReactComponent as RecycleSave } from '../../assets/icons/recycle-save.svg'
import classes from './ContactUs.module.scss'
import StyledSelect from '../../components/StyledSelect'
import Button from '../../components/Button'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import { useMessageContext } from '../../context/message'

export default function ContactUs() {
  const { formatMessage } = useIntl()
  const [topic, setTopic] = useState()
  const [message, setMessage] = useState()
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
    apiCall(
      () =>
        http
          .post(
            '/api/service/contact-us-form',
            { id: topic.value, message },
            config,
          )
          .then(() => {
            setBlockBtn(false)
          })
          .catch(() => {
            setBlockBtn(false)
          }),
      successCb,
    )
  }

  const successCb = () => {
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

  return (
    <Page footer>
      <RecycleSave className={classes.icon} />
      <label className={classes.label} htmlFor="topic">
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
      />
      <label className={classes.label} htmlFor="message">
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
      />

      <Button disabled={blockBtn} type="button" onClick={() => submitProblem()}>
        <FormattedMessage id="contactUs:Send" defaultMessage="Send" />
      </Button>
    </Page>
  )
}
