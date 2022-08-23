import React from 'react'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'

import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { TextPrimary } from '../../components/Text'
import http from '../../utils/http'
import OtpInput from '../../components/OtpInput'
import { setUser } from '../../actions/user'
import { useMessageContext } from '../../context/message'
import useApiCall from '../../utils/useApiCall'
import { detectLanguage } from '../../utils/intl'

export default function ConfirmationCode() {
  const [activationCode, setCode] = React.useState('')
  const navigate = useNavigate()
  const { formatMessage } = useIntl()
  const [, updateMessage] = useMessageContext()
  const location = useLocation()
  const regData = location.state || queryString.parse(location.search) || {}
  const dispatch = useDispatch()
  const [codeResend, setCodeResend] = React.useState(false)
  const { email, socialProvider } = regData
  const apiCall = useApiCall()
  const resendApiCall = useApiCall()

  function successCb(res) {
    dispatch(setUser({ ...res.data, socialProvider }))
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'confirmCode:Success',
          defaultMessage: 'Successful password setup!',
        }),
        onClose: () => navigate('../retailers-id'),
      },
      5000,
    )
  }

  function errorCb() {
    updateMessage(
      {
        type: 'error',
        text: formatMessage({
          id: 'confirmCode:Error',
          defaultMessage: 'Unsuccessful password setup!',
        }),
      },
      5000,
    )
  }

  function resendCode() {
    setCodeResend(true)

    resendApiCall(() =>
      http.post('/api/user/resendVerificationCode', { email }),
    )
  }

  function submit() {
    const data = {
      activationCode,
      email,
      lang: detectLanguage(),
    }

    apiCall(
      () => http.post('/api/user/confirmationEmail', data),
      successCb,
      errorCb,
    )
  }

  return (
    <Page>
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
          <TextButton type="button" onClick={resendCode} disabled={codeResend}>
            <TextPrimary>
              <FormattedMessage
                id="confirmCode:ResendCode"
                defaultMessage="Resend confirmation code"
              />
            </TextPrimary>
          </TextButton>
        </div>
      </Wrapper>
    </Page>
  )
}
const TextButton = styled.button`
  &:disabled {
    span {
      color: rgba(19, 34, 15, 0.3);
    }
  }
`
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
