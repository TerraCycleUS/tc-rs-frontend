import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, boolean, object } from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import Checkbox from '../../components/Checkbox'
import Text, { TextPrimary } from '../../components/Text'
import SocialLogin from '../../components/SocialLogin'
import { defaultRegistrationValues } from '../../utils/const'

const schema = object({
  name: string()
    .required()
    .min(
      3,
      <FormattedMessage
        id="signUp:NameError"
        defaultMessage="Name must be at least 3 characters long and 30 characters at most."
      />,
    )
    .max(
      30,
      <FormattedMessage
        id="signUp:NameError"
        defaultMessage="Name must be at least 3 characters long and 30 characters at most."
      />,
    ),
  email: string().email().required(),
  zipcode: string().required(),
  terms: boolean().oneOf(
    [true],
    <FormattedMessage
      id="signUp:TermsRequired"
      defaultMessage="Field must be checked"
    />,
  ),
  privacy: boolean().oneOf(
    [true],
    <FormattedMessage
      id="signUp:PrivacyRequired"
      defaultMessage="Field must be checked"
    />,
  ),
  messages: boolean().oneOf(
    [true],
    <FormattedMessage
      id="signUp:MessagesRequired"
      defaultMessage="Field must be checked"
    />,
  ),
})

const textInputs = [
  {
    name: 'name',
    label: { id: 'signUp:NameLabel', defaultMessage: 'Name' },
    placeholder: {
      id: 'signUp:NamePlaceholder',
      defaultMessage: 'Enter your name',
    },
  },
  {
    name: 'email',
    label: { id: 'signUp:EmailLabel', defaultMessage: 'Email' },
    placeholder: {
      id: 'signUp:EmailPlaceholder',
      defaultMessage: 'Enter your registered email address',
    },
  },
  {
    name: 'zipcode',
    label: { id: 'signUp:ZipLabel', defaultMessage: 'Zip code' },
    placeholder: {
      id: 'signUp:ZipPlaceholder',
      defaultMessage: 'Enter your Zip code',
    },
  },
]

const checkboxes = [
  {
    name: 'terms',
    content: {
      id: 'signUp:Terms',
      defaultMessage:
        'I confirm that I have read and agree to the <a>Terms&Conditions of Terracycle</a>',
      values: {
        a: (chunks) => <a href="https://google.com">{chunks}</a>,
      },
    },
  },
  {
    name: 'privacy',
    content: {
      id: 'signUp:Privacy',
      defaultMessage:
        'I confirm that I have read and agree to the the <a>Privacy Policy of Terracycle</a>',
      values: {
        a: (chunks) => <a href="https://google.com">{chunks}</a>,
      },
    },
  },
  {
    name: 'messages',
    content: {
      id: 'signUp:Messages',
      defaultMessage:
        'I consent to Terracycle to send me marketing messages \nusing the data (name, e-mail address) hereby provided by me.',
    },
  },
]

export default function Registration() {
  const navigate = useNavigate()
  const location = useLocation()
  const defaultValues = location.state || defaultRegistrationValues

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    navigate('pw-setup', { state: data })
  }

  const { formatMessage } = useIntl()

  return (
    <Page
      title={
        <FormattedMessage id="signUp:Title" defaultMessage="Create account" />
      }
      backButton
    >
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {textInputs.map(({ name, label, placeholder }) => (
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
          {checkboxes.map(({ name, content }) => (
            <Checkbox
              key={name}
              id={name}
              input={register(name)}
              error={errors[name]?.message}
            >
              <Text>
                <FormattedMessage {...content} />
              </Text>
            </Checkbox>
          ))}
          <Button disabled={isSubmitted && !isValid}>
            <FormattedMessage
              id="signUp:SubmitButton"
              defaultMessage="Create account"
            />
          </Button>
        </form>
        <SocialLogin />
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
  form {
    margin-bottom: 40px;

    .text-field {
      margin-bottom: 20px;
    }

    .checkbox {
      margin-bottom: 20px;
    }

    .text-field + .checkbox,
    .checkbox + .main-button {
      margin-top: 30px;
    }
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 39px 0 50px;
  }
`
