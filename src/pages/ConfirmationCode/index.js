import React from 'react'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { TextPrimary } from '../../components/Text'
import http from '../../utils/http'
import useMessage from '../../utils/useMessage'
import BackdropMessage from '../../components/Message/BackdropMessage'
import extractErrorMessage from '../../utils/extractErrorMessage'
import OtpInput from '../../components/OtpInput'
import { setUser } from '../../actions/user'

export default function ConfirmationCode() {
  const [activationCode, setCode] = React.useState('')
  const { formatMessage } = useIntl()
  const navigate = useNavigate()
  const [message, updateMessage, clear] = useMessage()
  const [redirect, setRedirect] = React.useState(false)
  const location = useLocation()
  const regData = location.state || {}
  const dispatch = useDispatch()
  const [codeResend, setCodeResend] = React.useState(false)
  const { email } = regData

  React.useEffect(() => {
    if (redirect && !message) {
      navigate('../retailers-id')
    }
  })

  function resendCode() {
    setCodeResend(true)

    http.post('/api/user/resendVerificationCode', { email }).catch((res) => {
      updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
    })
  }

  function submit() {
    const data = {
      activationCode,
      email,
    }

    http
      .post('/api/user/confirmationEmail', data)
      .then((res) => {
        dispatch(setUser(res.data))
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
        setRedirect(true)
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
          isInputNum
        />
        <Button disabled={activationCode.length < 4} onClick={submit}>
          <FormattedMessage
            id="confirmCode:SubmitButton"
            defaultMessage="Next"
          />
        </Button>
        <div className="link-row">
          <button type="button" onClick={resendCode} disabled={codeResend}>
            <TextPrimary>
              <FormattedMessage
                id="confirmCode:ResendCode"
                defaultMessage="Resend confirmation code"
              />
            </TextPrimary>
          </button>
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
