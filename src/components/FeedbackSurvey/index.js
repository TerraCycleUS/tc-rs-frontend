import React from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import classes from "./FeedbackSurvey.module.scss";
const LINK_TO_THE_SURVEY = "https://fr.surveymonkey.com/r/87MT9CD";
export default function FeedbackSurvey() {
  return (
    <div className={classes.feedbackSurvey}>
      <p className={classes.description}>
        <FormattedMessage
          id="FeedbackSurvey:Description"
          defaultMessage="Do you have 5 minutes to help us meet your expectations? <link>Fill out this survey on our services</link>"
          values={{
            link: (chunks) => (
              <a
                className={classNames(classes.description, classes.link)}
                href={LINK_TO_THE_SURVEY}
                target="_blank" rel="noreferrer"
              >
                {chunks}
              </a>
            ),
          }}
        />
      </p>
    </div>
  );
}
