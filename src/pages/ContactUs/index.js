import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import Page from '../../Layouts/Page'
import { ReactComponent as RecycleSave } from '../../assets/icons/recycle-save.svg'
import classes from './ContactUs.module.scss'
import StyledSelect from '../../components/StyledSelect'
import Button from '../../components/Button'

const mockOptions = [{ value: 0, label: 'General Inquiry' }]

export default function ContactUs() {
  const { formatMessage } = useIntl()
  const [topic, setTopic] = useState()
  const [message, setMessage] = useState()
  const [blockBtn, setBlockBtn] = useState(true)

  useEffect(() => {
    if (message && topic) setBlockBtn(false)
    else setBlockBtn(true)
  }, [message, topic])

  function submitProblem() {
    // post call which sends topic and message
    // also should block button on pending
    // after that navigate to profile?
  }

  return (
    <Page footer>
      <RecycleSave className={classes.icon} />
      <label className={classes.label} htmlFor="topic">
        <FormattedMessage id="contactUs:Topic" defaultMessage="Topic" />
      </label>
      <StyledSelect
        className={classes.select}
        options={mockOptions}
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
