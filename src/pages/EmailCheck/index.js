import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import classNames from 'classnames'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { TextPrimary } from '../../components/Text'
import { ReactComponent as Image } from '../../assets/images/email_illustration.svg'
import classes from './EmailCheck.module.scss'

export default function EmailCheck({ forResetPw = false }) {
  const location = useLocation()
  const values = queryString.parse(location.search) || {}
  const { email } = values
  return (
    <Page innerClassName={classes.emailCheckWrap}>
      <div className={classes.wrapper}>
        <div className={classes.imageRow}>
          <Image />
        </div>
        <Text className="text-center">
          <FormattedMessage
            id={
              forResetPw
                ? 'emailCheck:DescriptionReset'
                : 'emailCheck:Description'
            }
            defaultMessage={
              forResetPw
                ? 'We have sent you a password reset link on the following email address:'
                : 'We have sent you a 4 digit code to the following email address:'
            }
          />
        </Text>
        <Text className={classNames('text-center', classes.email)}>
          {email}
        </Text>
        <p className={classes.spam}>
          <FormattedMessage
            id="emailCheck:Spam"
            defaultMessage="If you do not see the email, please check your “junk mail” folder or “spam”."
          />
        </p>
        <Link
          state={values}
          to={{
            pathname: forResetPw
              ? '/reset-password'
              : '/registration/confirm-code',
            search: location.search,
          }}
          data-testid="register-or-confirm"
        >
          <Button>
            <FormattedMessage
              id={
                forResetPw
                  ? 'emailCheck:MistypedEmail'
                  : 'emailCheck:SubmitButton'
              }
              defaultMessage={forResetPw ? 'Mistyped my Email' : 'Validate now'}
            />
          </Button>
        </Link>
        <div className={classes.linkRow}>
          <Link
            to={{
              pathname: forResetPw ? '/sign-in' : '/registration',
              search: location.search,
            }}
            data-testid="signin-or-register"
          >
            <TextPrimary>
              <FormattedMessage
                id={forResetPw ? 'signUp:SignIn' : 'emailCheck:MistypedEmail'}
                defaultMessage={forResetPw ? 'Sign in' : 'Mistyped my Email'}
              />
            </TextPrimary>
          </Link>
        </div>
      </div>
    </Page>
  )
}

EmailCheck.propTypes = {
  forResetPw: PropTypes.bool,
}
