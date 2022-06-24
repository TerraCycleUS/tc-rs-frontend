import React from 'react'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'
import OtpInput from 'react-otp-input'

import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { TextPrimary } from '../../components/Text'
import { useRegistrationData } from '../../context/registrationData'
import http from '../../utils/http'
import useMessage from '../../utils/useMessage'
import { useUserData } from '../../context/user'
import BackdropMessage from '../../components/Message/BackdropMessage'
import extractErrorMessage from '../../utils/extractErrorMessage'

export default function ConfirmationCode() {
  const [activationCode, setCode] = React.useState('')
  const { formatMessage } = useIntl()
  const [{ email }] = useRegistrationData()
  const navigate = useNavigate()
  const [message, updateMessage, clear] = useMessage()
  const [user, setUser] = useUserData()

  React.useEffect(() => {
    if (user && !message) {
      navigate('../retailers-id')
    }
  })

  function submit() {
    const data = {
      activationCode,
      email,
    }

    http
      .post('/api/user/confirmationEmail', data)
      .then((res) => {
        setUser(res.data)
        updateMessage(
          {
            type: 'success',
            text: formatMessage({
              id: 'confirmCode:Success',
              defaultMessage: 'Successful password setup!',
            }),
          },
          5000,
        )
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
  }

  return (
    <Page
      title={
        <FormattedMessage
          id="confirmCode:Title"
          defaultMessage="Confirmation code"
        />
      }
      backButton
    >
      {message ? (
        <BackdropMessage onClose={clear} type={message.type}>
          {message.text}
        </BackdropMessage>
      ) : null}
      <Wrapper>
        <Text className="description text-md-center">
          <FormattedMessage
            id="confirmCode:Description"
            defaultMessage="Please enter the 4 digits code we’ve just sent to your email"
          />
        </Text>
        <OtpInput
          value={activationCode}
          onChange={setCode}
          numInputs={4}
          containerStyle="code-input-container"
          inputStyle="code-input"
        />
        <Button disabled={activationCode.length < 4} onClick={submit}>
          <FormattedMessage
            id="confirmCode:SubmitButton"
            defaultMessage="Next"
          />
        </Button>
        <div className="link-row">
          <TextPrimary>
            <FormattedMessage
              id="confirmCode:ResendCode"
              defaultMessage="Resend confirmation code"
            />
          </TextPrimary>
        </div>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled.div`
  .description {
    margin-bottom: 30px;
  }

  .code-input-container {
    justify-content: center;
    margin-bottom: 30px;

    > div {
      margin: 0 8px;
    }
  }

  .code-input {
    width: 60px !important;
    height: 60px;
    border-radius: 50%;
    font-size: 24px;
    line-height: 34px;
    ${({ theme }) => `
      background-color: ${theme.secondary};
      color: ${theme.textPrimary};
      caret-color: ${theme.textPrimary};
    `}

    &:focus {
      background-color: #fff;
      border: 2px solid ${({ theme }) => theme.textSecondary};
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.17);
    }
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 30px 0 50px;
  }
`
