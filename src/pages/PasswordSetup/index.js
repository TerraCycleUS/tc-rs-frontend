import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, ref } from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import Text, { TextPrimary } from '../../components/Text'
import http from '../../utils/http'
import { useRegistrationData } from '../../context/registrationData'
import { useLocale } from '../../context/locale'
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from '../../utils/const'
import useMessage from '../../utils/useMessage'
import BackdropMessage from '../../components/Message/BackdropMessage'
import extractErrorMessage from '../../utils/extractErrorMessage'

const defaultValues = {
  password: '',
  confirm: '',
}

const PASSWORD_REG =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/

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

const passwordTextInputs = [
  {
    name: 'password',
    label: {
      id: 'passwordReset:PasswordLabel',
      defaultMessage: 'New Password',
    },
    placeholder: {
      id: 'passwordReset:PasswordPlaceholder',
      defaultMessage: 'Enter your new password',
    },
  },
  {
    name: 'confirm',
    label: {
      id: 'passwordReset::ConfirmLabel',
      defaultMessage: 'Confirm New Password',
    },
    placeholder: {
      id: 'passwordReset:ConfirmPlaceholder',
      defaultMessage: 'Confirm your new password',
    },
  },
]

export default function PasswordSetup({ forResetPw = false }) {
  const navigate = useNavigate()
  const [values] = useRegistrationData()
  const [currentLang] = useLocale()
  const [message, updateMessage, clear] = useMessage()

  const lang = AVAILABLE_LANGUAGES[currentLang] ? currentLang : DEFAULT_LANGUAGE

  const { formatMessage } = useIntl()

  const schema = object({
    password: string()
      .required()
      .min(
        8,
        formatMessage({
          id: 'pwSetup:PasswordError',
          defaultMessage:
            'Password must be at least 8 characters long. Password must contain at least one lowercase character, one uppercase character and one non-alphanumeric character.',
        }),
      )
      .matches(
        PASSWORD_REG,
        formatMessage({
          id: 'pwSetup:PasswordError',
          defaultMessage:
            'Password must be at least 8 characters long. Password must contain at least one lowercase character, one uppercase character and one non-alphanumeric character.',
        }),
      ),
    confirm: string()
      .required()
      .oneOf(
        [ref('password')],
        formatMessage({
          id: 'pwSetup:PasswordMathcError',
          defaultMessage: 'Passwords must match',
        }),
      ),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const remapElements = ({ name, label, placeholder }) => (
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
  )

  const onSubmit = ({ password }) => {
    const { name, email, zipcode } = values
    const data = {
      name,
      email,
      zipcode,
      password,
      lang,
    }

    http
      .post('/api/user/registration', data)
      .then(() => {
        navigate('../email-check')
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
  }

  return (
    <Page
      title={
        <FormattedMessage
          id={forResetPw ? 'passwordReset:Title' : 'pwSetup:Title'}
          defaultMessage={forResetPw ? 'Password reset' : 'Password setup'}
        />
      }
      backButton={!forResetPw}
    >
      {message ? (
        <BackdropMessage onClose={clear} type={message.type}>
          {message.text}
        </BackdropMessage>
      ) : null}
      <Wrapper>
        <div>
          <Text className="pw-description">
            <FormattedMessage
              id={
                forResetPw
                  ? 'passwordReset:setNewPassword'
                  : 'pwSetup:Description'
              }
              defaultMessage={
                forResetPw
                  ? 'You have successfully confirmed your e-mail address, now please enter your new password:'
                  : 'You have successfully confirmed your e-mail address, now please enter your password:'
              }
            />
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            {forResetPw
              ? passwordTextInputs.map(remapElements)
              : textInputs.map(remapElements)}
            <Button disabled={isSubmitted && !isValid}>
              <FormattedMessage
                id="pwSetup:SubmitButton"
                defaultMessage="Save"
              />
            </Button>
          </form>
        </div>
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

PasswordSetup.propTypes = {
  forResetPw: PropTypes.bool,
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;

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
