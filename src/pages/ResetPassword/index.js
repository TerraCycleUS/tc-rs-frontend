import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { FormattedMessage, useIntl } from 'react-intl'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { object, string } from 'yup'
import { Link, useNavigate } from 'react-router-dom'

import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import BackdropMessage from '../../components/Message/BackdropMessage'
import Text, { TextPrimary } from '../../components/Text'
import http from '../../utils/http'
import extractErrorMessage from '../../utils/extractErrorMessage'
import useMessage from '../../utils/useMessage'
import { useRegistrationData } from '../../context/registrationData'

const schema = object({
  email: string().email().required().max(50),
})

export default function ResetPassword() {
  const { formatMessage } = useIntl()
  const navigate = useNavigate()
  const [message, updateMessage, clear] = useMessage()
  const [defaultValues, setValues] = useRegistrationData()

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const onSubmit = (data) => {
    setValues(data)
    const email = { email: data.email }
    http
      .post('/api/user/resetPassword', email)
      .then(() => navigate('/email-check'))
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
      .then(() => navigate('../email-check'))
  }

  return (
    <Page
      title={
        <FormattedMessage
          id="passwordReset:Title"
          defaultMessage="Password reset"
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
        <div>
          <Text className="description text-md-center">
            <FormattedMessage
              id="passwordReset:Description"
              defaultMessage="Please enter your registered email address:"
            />
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="input-field"
              id="email"
              label={formatMessage({
                id: 'passwordReset:EmailLabel',
                defaultMessage: 'Email',
              })}
              error={errors.email?.message}
              input={{
                ...register('email'),
                placeholder: formatMessage({
                  id: 'passwordReset:EmailPlaceholder',
                  defaultMessage: 'Enter your registered email address',
                }),
              }}
            />
            <Button disabled={!dirtyFields.email} type="submit">
              <FormattedMessage
                id="passwordReset:Button"
                defaultMessage="Send"
              />
            </Button>
          </form>
        </div>
        <Link to="/sign-in" className="sign-in-link">
          <TextPrimary>
            <FormattedMessage id="signUp:SignIn" defaultMessage="Sign in" />
          </TextPrimary>
        </Link>
      </Wrapper>
    </Page>
  )
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  .description {
    margin-bottom: 20px;
    color: ${({ theme }) => theme.textPrimary};
  }

  .input-field {
    margin-bottom: 30px;
  }

  .sign-in-link {
    margin: 50px 0;
    display: flex;
    justify-content: center;
  }
`
