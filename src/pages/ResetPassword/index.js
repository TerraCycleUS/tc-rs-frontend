import React from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { object, string } from 'yup'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import classNames from 'classnames'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Text, { TextPrimary } from '../../components/Text'
import http from '../../utils/http'
import { defaultRegistrationValues } from '../../utils/const'
import useApiCall from '../../utils/useApiCall'
import classes from './ResetPassword.module.scss'

const schema = object({
  email: string()
    .email(
      <FormattedMessage
        id="passwordReset:EmailInvalid"
        defaultMessage="Email must be a valid Email."
      />,
    )
    .required()
    .max(50),
})

export default function ResetPassword() {
  const { formatMessage } = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const defaultValues =
    queryString.parse(location.search) || defaultRegistrationValues

  const apiCall = useApiCall()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const onSubmit = (data) => {
    const email = { email: data.email }
    apiCall(
      () => http.post('/api/user/resetPassword', email),
      () => {
        navigate({
          pathname: 'email-check',
          search: queryString.stringify(data),
        })
      },
    )
  }

  return (
    <Page>
      <div className={classes.wrapper}>
        <div>
          <Text
            className={classNames(classes.description, 'text-md-center')}
            data-testid="reset-password-text"
          >
            <FormattedMessage
              id="passwordReset:Description"
              defaultMessage="Please enter your email address:"
            />
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className={classes.inputField}
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
            <Button disabled={!isValid && isSubmitted} type="submit">
              <FormattedMessage
                id="passwordReset:Button"
                defaultMessage="Send"
              />
            </Button>
          </form>
        </div>
        <Link
          to="/sign-in"
          className={classes.signInLink}
          data-testid="sign-in"
        >
          <TextPrimary>
            <FormattedMessage id="signUp:SignIn" defaultMessage="Sign in" />
          </TextPrimary>
        </Link>
      </div>
    </Page>
  )
}
