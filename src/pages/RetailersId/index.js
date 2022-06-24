import React, { useState } from 'react'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { Description, Label, TextPrimary } from '../../components/Text'
import Input from './Input'
import useMessage from '../../utils/useMessage'
import http from '../../utils/http'
import BackdropMessage from '../../components/Message/BackdropMessage'
import CreateNow from '../../components/PopUps/CreateNow'

export default function RetailersId() {
  const [code, setCode] = React.useState('')
  const [message, updateMessage, clear] = useMessage()
  const [show, setShow] = useState(false)
  const { formatMessage } = useIntl()

  function openPop() {
    setShow(true)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    http
      .post('/api/user/retailersId', { retailersId: code })
      .then(() => {
        updateMessage(
          {
            type: 'success',
            text: formatMessage({
              id: 'retailersId:Success',
              defaultMessage: 'Successfully added retailer’s ID!',
            }),
          },
          10000,
        )
      })
      .catch(({ response }) => {
        let text = null
        if (response.status === 404) {
          text = response.data.message
        } else {
          text = response.data.errors.join('\n')
        }

        updateMessage({ type: 'error', text }, 10000)
      })
  }

  const inputs = Input({
    length: 17,
    input: { placeholder: '_' },
    onChange: setCode,
    validate: (_, char, i) => {
      if (i < 6 && !/[0-9]/.test(char)) return false

      if (i > 5 && !/[a-zA-Z]/.test(char)) return false

      return true
    },
  })

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
      {message ? (
        <BackdropMessage onClose={clear} type={message.type}>
          {message.text}
        </BackdropMessage>
      ) : null}
      <Wrapper>
        <Text className="description text-md-center">
          <FormattedMessage
            id="retailersId:Description"
            defaultMessage="You have successfully registered. Please enter your Retailer’s ID:"
          />
        </Text>
        <form onSubmit={submitHandler}>
          <Label>
            <FormattedMessage
              id="retailersId:InputLabel"
              defaultMessage="Retailer’s ID"
            />
          </Label>
          <div className="code-input">
            <div className="input-wrapper">{inputs.slice(0, 6)}</div>
            <span>-</span>
            <div className="input-wrapper">{inputs.slice(6)}</div>
          </div>
          <Button
            disabled={code.length < 17}
            onClick={submitHandler}
            type="submit"
          >
            <FormattedMessage
              id="retailersId:SubmitButton"
              defaultMessage="Save"
            />
          </Button>
        </form>
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
        <Button onClick={openPop} inverted>
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
        {show ? <CreateNow setShow={setShow} /> : ''}
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

    @media (min-width: 768px) {
      .code-input {
        justify-content: flex-start;

        span {
          flex: 0;
          padding: 0 20px;
        }
      }
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

  .no-bg-btn {
    margin-top: 12px;
    margin-bottom: 26px;
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 20px 0 50px;
  }
`
