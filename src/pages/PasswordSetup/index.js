import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, ref } from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import Text, { TextPrimary } from '../../components/Text'

const defaultValues = {
  password: '',
  confirm: '',
}

const schema = object({
  password: string().required(),
  confirm: string()
    .required()
    .oneOf(
      [ref('password')],
      <FormattedMessage
        id="pwSetup:PasswordMathcError"
        defaultMessage="Passwords must match"
      />,
    ),
})

const textInputs = [
  {
    name: 'password',
    label: { id: 'pwSetup:PasswordLabel', defaultMessage: 'Password' },
    placeholder: {
      id: 'pwSetup:PasswordPlaceholder',
      defaultMessage: 'Enter your password',
    },
  },
  {
    name: 'confirm',
    label: { id: 'pwSetup:ConfirmLabel', defaultMessage: 'Confirm Password' },
    placeholder: {
      id: 'pwSetup:ConfirmPlaceholder',
      defaultMessage: 'Confirm your password',
    },
  },
]

export default function PasswordSetup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const onSubmit = () => {
    navigate('../email-check')
  }

  const { formatMessage } = useIntl()

  return (
    <Page
      title={
        <FormattedMessage id="pwSetup:Title" defaultMessage="Password setup" />
      }
      backButton
    >
      <Wrapper>
        <Text className="pw-description">
          <FormattedMessage
            id="pwSetup:Description"
            defaultMessage="You have successfully confirmed your e-mail address, now please enter your password:"
          />
        </Text>
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
                type: 'password',
              }}
            />
          ))}
          <Button disabled={isSubmitted && !isValid}>
            <FormattedMessage id="pwSetup:SubmitButton" defaultMessage="Save" />
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
  .pw-description {
    margin-bottom: 20px;
  }

  form {
    margin-bottom: 40px;

    .text-field {
      margin-bottom: 20px;
    }

    .main-button {
      margin-top: 30px;
    }
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 39px 0 50px;
  }
`
