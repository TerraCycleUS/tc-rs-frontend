import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'
import { useForm } from 'react-hook-form'
import queryString from 'query-string'

import Text, { TextPrimary } from '../../components/Text'
import Page from '../../Layouts/Page'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'

const textInputs = [
  {
    name: 'email',
    label: { id: 'emailSetup:EmailLabel', defaultMessage: 'Email' },
    placeholder: {
      id: 'emailSetup:EmailPlaceholder',
      defaultMessage: 'Enter your email address',
    },
  },
  {
    name: 'zipcode',
    label: { id: 'emailSetup:ZipLabel', defaultMessage: 'Zip code' },
    placeholder: {
      id: 'emailSetup:ZipPlaceholder',
      defaultMessage: 'Enter your Zip code',
    },
  },
]

export default function EmailSetup() {
  const navigate = useNavigate()
  const location = useLocation()
  const { email: defaultEmail, sessionId } = queryString.parse(location.search)
  const { formatMessage } = useIntl()
  const apiCall = useApiCall()

  const schema = object({
    email: string().email().required().max(50),
    zipcode: string().required().max(30),
  })

  const defaultValues = {
    zipcode: '',
    email: defaultEmail || '',
  }

  const submitHandler = (data) => {
    apiCall(
      () =>
        http.post('/api/user/updateSocialProfile', {
          ...data,
          session_id: sessionId,
        }),
      (response) =>
        navigate({
          pathname: '/registration/email-check',
          search: queryString.stringify({ email: response.data.email }),
        }),
    )
  }

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const allowedInputs = defaultEmail ? [textInputs[1]] : textInputs

  const validEmail = dirtyFields.email || defaultEmail
  const validZipcode = dirtyFields.zipcode

  return (
    <Page>
      <Wrapper>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Text className="description">
            {!defaultEmail ? (
              <FormattedMessage
                id="emailSetup:Description"
                defaultMessage="Please enter your email address:"
              />
            ) : (
              <FormattedMessage
                id="emailSetup:DescriptionZipOnly"
                defaultMessage="Please enter your postcode:"
              />
            )}
          </Text>
          {allowedInputs.map(({ name, label, placeholder }) => (
            <TextField
              key={name}
              id={name}
              label={formatMessage(label)}
              error={errors[name]?.message}
              input={{
                ...register(name),
                placeholder: formatMessage(placeholder),
              }}
            />
          ))}
          <Button type="submit" disabled={!(validEmail && validZipcode)}>
            <FormattedMessage
              id="emailSetup:SubmitButton"
              defaultMessage="Save"
            />
          </Button>
        </form>
        <div className="link-row">
          <Link to="/sign-in" className="sign-in-link">
            <TextPrimary>
              <FormattedMessage id="signUp:SignIn" defaultMessage="Sign in" />
            </TextPrimary>
          </Link>
        </div>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  form {
    flex-shrink: 0;
  }

  .description {
    margin-bottom: 20px;
  }

  .text-field {
    margin-bottom: 20px;
  }

  .text-field + .main-button {
    margin-top: 30px;
  }

  .link-row {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 39px 0 50px;
    flex-grow: 1;
  }
`
