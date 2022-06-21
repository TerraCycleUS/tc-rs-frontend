import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import OtpInput from 'react-otp-input'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { TextPrimary } from '../../components/Text'

export default function ConfirmationCode() {
  const [code, setCode] = React.useState('')

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
      <Wrapper>
        <Text className="description text-md-center">
          <FormattedMessage
            id="confirmCode:Description"
            defaultMessage="Please enter the 4 digits code we’ve just sent to your email"
          />
        </Text>
        <OtpInput
          value={code}
          onChange={setCode}
          numInputs={4}
          containerStyle="code-input-container"
          inputStyle="code-input"
        />
        <Button disabled={code.length < 4}>
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
    background-color: ${({ theme }) => theme.secondary};
    font-size: 24px;
    line-height: 34px;
    color: ${({ theme }) => theme.textPrimary};

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
