import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { Description, Label, TextPrimary } from '../../components/Text'
import Input from './Input'

const numericInputs = Array.from({ length: 6 }).map((_, i) => i)
const letterInputs = Array.from({ length: 11 }).map((_, i) => i)

// pattern for input
// const pattern = /^([0-9]{0,6}|([0-9]{6}[a-zA-Z]{1,11}))$/gm

export default function RetailersId() {
  const [code] = React.useState('')

  return (
    <Page
      title={
        <FormattedMessage
          id="retailersId:Title"
          defaultMessage="Retailer’s ID"
        />
      }
      backButton
    >
      <Wrapper>
        <Text className="description text-md-center">
          <FormattedMessage
            id="retailersId:Description"
            defaultMessage="You have successfully registered. Please enter your Retailer’s ID:"
          />
        </Text>
        <Label>
          <FormattedMessage
            id="retailersId:InputLabel"
            defaultMessage="Retailer’s ID"
          />
        </Label>
        <Input />
        <div className="code-input">{/* Input */}</div>
        <Button
          disabled={code.length < numericInputs.length + letterInputs.length}
        >
          <FormattedMessage
            id="retailersId:SubmitButton"
            defaultMessage="Save"
          />
        </Button>
        <Description className="text-center description-bottom">
          <FormattedMessage
            id="retailersId:DescriptionBotton"
            defaultMessage="TerraCycle will share necessary datails with Monoprix to deliver coupons to your account"
          />
        </Description>
        <Text className="text-center no-id">
          <FormattedMessage
            id="retailersId:NoId"
            defaultMessage="Do not have a retailer’s ID?"
          />
        </Text>
        <Button inverted>
          <FormattedMessage
            id="retailersId:Create"
            defaultMessage="Create now"
          />
        </Button>
        <div className="link-row">
          <TextPrimary>
            <FormattedMessage
              id="retailersId:Skip"
              defaultMessage="Skip for now"
            />
          </TextPrimary>
        </div>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled.div`
  .description {
    margin-bottom: 52px;
  }

  .code-input {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    .input-wrapper {
      display: flex;
      border-radius: 30px;
      padding: 11px 15px;
      width: auto !important;
      background-color: ${({ theme }) => theme.secondary}};

      input {
        text-align: center;
        width: 15px;
        font-weight: 500;
        font-size: 15px;
        line-height: 24px;

        ${({ theme }) => `
          color: ${theme.textPrimary};

          &::placeholder {
            color: ${theme.textSecondary};
          }
        `}

      }
    }

    span {
      flex: 1;
      text-align: center;
    }
  }

  .description-bottom {
    margin-bottom: 60px;
  }

  .no-id {
    margin-bottom: 20px;
  }

  .main-button {
    margin-bottom: 15px;
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 20px 0 50px;
  }
`
