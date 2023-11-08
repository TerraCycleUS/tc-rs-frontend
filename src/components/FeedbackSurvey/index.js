import React from 'react'
import { FormattedMessage } from 'react-intl'
import classes from './FeedbackSurvey.module.scss'
import { ReactComponent as ForwardArrow } from '../../assets/icons/forward-arrow-right.svg'

const LINK_TO_THE_SURVEY = 'https://fr.surveymonkey.com/r/87MT9CD'
export default function FeedbackSurvey() {
  return (
    <div className={classes.feedbackSurvey}>
      <p className={classes.description}>
        <FormattedMessage
          id="FeedbackSurvey:Description"
          defaultMessage="Would you like to give a quick feedback for our service? "
        />
      </p>
      <a className={classes.link} href={LINK_TO_THE_SURVEY} target="_blank">
        <span className={classes.text}>
          <FormattedMessage
            id="FeedbackSurvey:Link"
            defaultMessage="Go to the survey"
          />
        </span>
        <ForwardArrow />
      </a>
    </div>
  )
}
