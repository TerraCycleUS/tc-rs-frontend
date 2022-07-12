import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { TextPrimary } from '../../components/Text'
import { ReactComponent as Image } from '../../assets/images/email_illustration.svg'

export default function EmailCheck({ forResetPw = false }) {
  const location = useLocation()
  const values = location.state || {}
  const { email } = values
  return (
    <Page
      title={
        <FormattedMessage
          id="emailCheck:Title"
          defaultMessage="Check your email"
        />
      }
      backButton
    >
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
        <Link state={values} to={forResetPw ? '../' : '../confirm-code'}>
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
          <Link state={values} to={forResetPw ? '/sign-in' : '../'}>
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
    margin-bottom: 44px;

    svg {
      display: block;
      margin: auto;
    }
  }

  .text-center {
    margin-bottom: 15px;

    &.email {
      margin-bottom: 30px;
      color: ${({ theme }) => theme.main};
    }
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 50px 0 50px;
  }
`
