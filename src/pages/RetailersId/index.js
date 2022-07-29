import React, { useState } from 'react'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import Text, { Description, Label, TextPrimary } from '../../components/Text'
import useMessage from '../../utils/useMessage'
import http from '../../utils/http'
import BackdropMessage from '../../components/Message/BackdropMessage'
import extractErrorMessage from '../../utils/extractErrorMessage'
import CreateNow from '../../components/PopUps/CreateNow'
import OtpInput from '../../components/OtpInput'
import { updateUser } from '../../actions/user'

const regex = /^(\d{1,6}|\d{6}[a-zA-Z]{1,11})$/

export default function RetailersId() {
  const [{ code, isNum }, setCode] = React.useState({ code: '', isNum: true })
  const [redirect, setRedirect] = React.useState(false)
  const [message, updateMessage, clear] = useMessage()
  const [show, setShow] = useState(false)
  const { formatMessage } = useIntl()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (redirect && !message) {
      navigate('/')
    }
  })

  function openPop() {
    setShow(true)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const config = {
      headers: {
        Authorization: `Bearer ${user?.authorization}`,
      },
    }

    const data = {
      retailerId: code,
    }

    http
      .put('/api/user/updateProfile', data, config)
      .then((response) => {
        dispatch(updateUser({ retailerId: response.data.retailerId }))
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
        setRedirect(true)
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
  }

  return (
    <Page
      title={
        <FormattedMessage id="monoprixId:Title" defaultMessage="Monoprix ID" />
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
            <OtpInput
              value={code}
              validate={(char, i) => {
                const newValue = code.split('')
                const deleteCount = newValue[i] !== undefined ? 1 : 0
                newValue.splice(i, deleteCount, char)
                return regex.test(newValue.join(''))
              }}
              onChange={(value) => {
                setCode({ code: value, isNum: !/^\d{6}/.test(value) })
              }}
              numInputs={17}
              placeholder={'_'.repeat(17)}
              containerStyle="input-wrapper"
              isInputNum={isNum}
              autoCapitalize="off"
              split={6}
              contentBetween={<span>-</span>}
            />
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
            <Link to="/">
              <FormattedMessage
                id="retailersId:Skip"
                defaultMessage="Skip for now"
              />
            </Link>
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
          caret-color: ${theme.textPrimary};

          &::placeholder {
            color: ${theme.textSecondary};
          }
        `}

        &:focus::placeholder {
          color: transparent !important;
        }
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
