import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { TextPrimary } from '../../components/Text'
import { ReactComponent as Image } from '../../assets/images/email_illustration.svg'
import { useRegistrationData } from '../../context/registrationData'

export default function EmailCheck() {
  const [values] = useRegistrationData()

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
            id="emailCheck:Description"
            defaultMessage="We have sent you a 4 digit code to the following email address:"
          />
        </Text>
        <Text className="email text-center">{values.email}</Text>
        <Link to="../confirm-code">
          <Button>
            <FormattedMessage
              id="emailCheck:SubmitButton"
              defaultMessage="Validate now"
            />
          </Button>
        </Link>
        <div className="link-row">
          <Link to="../">
            <TextPrimary>
              <FormattedMessage
                id="emailCheck:MistypedEmail"
                defaultMessage="Mistyped my Email"
              />
            </TextPrimary>
          </Link>
        </div>
      </Wrapper>
    </Page>
  )
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
