import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import queryString from 'query-string'

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
      <Wrapper>
        <div className="image-row">
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
        <Text className="email text-center">{email}</Text>
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
        <div className="link-row">
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
      </Wrapper>
    </Page>
  )
}

EmailCheck.propTypes = {
  forResetPw: PropTypes.bool,
}

const Wrapper = styled.div`
  .pw-description {
    margin-bottom: 20px;
  }

  .image-row {
    margin-bottom: 30px;

    svg {
      display: block;
      margin: auto;
    }
  }

  .text-center {
    margin-bottom: 8px;

    &.email {
      margin-bottom: 8px;
      color: ${({ theme }) => theme.main};
    }
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 30px 0 33px;
  }
`
