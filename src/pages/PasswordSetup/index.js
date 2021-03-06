import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, ref } from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import Text, { TextPrimary } from '../../components/Text'
import http from '../../utils/http'

import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  PASSWORD_REG,
} from '../../utils/const'
import { detectLanguage } from '../../utils/intl'
import useApiCall from '../../utils/useApiCall'
import { useMessageContext } from '../../context/message'

const defaultValues = {
  password: '',
  confirm: '',
}

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
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const currentLang = user?.lang || detectLanguage()
  const [, updateMessage] = useMessageContext()
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

  const submitApiCall = useApiCall(() => {
    navigate({
      pathname: '../email-check',
      search: location.search,
    })
  })

  const onSubmit = ({ password }) => {
    const { name, email, zipcode } = queryString.parse(location.search)
    const data = {
      name,
      email,
      zipcode,
      password,
      lang,
    }

    submitApiCall(() => http.post('/api/user/registration', data))
  }

  const setPwSubmitApiCall = useApiCall(() => {
    updateMessage({
      type: 'success',
      text: (
        <FormattedMessage
          id="pwReset:Success"
          defaultMessage="Successful password setup!"
        />
      ),
    })
  })

  const setPwSubmit = ({ password }) => {
    const params = queryString.parse(location.search)
    setPwSubmitApiCall(() =>
      http.post('/api/user/setPassword', {
        resetPasswordToken: params.resetPasswordToken,
        password,
      }),
    )
  }

  return (
    <Page>
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
                  : 'Please choose a password for your account:'
              }
            />
          </Text>
          <form onSubmit={handleSubmit(forResetPw ? setPwSubmit : onSubmit)}>
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
