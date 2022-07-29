import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import Page from '../../Layouts/Page'
import { ReactComponent as Eye } from '../../assets/icons/password-mask.svg'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Text, { TextPrimary } from '../../components/Text'
import http from '../../utils/http'
import useMessage from '../../utils/useMessage'
import BackdropMessage from '../../components/Message/BackdropMessage'
import extractErrorMessage from '../../utils/extractErrorMessage'
import SocialLogin from '../../components/SocialLogin'
import { setUser } from '../../actions/user'

const defaultValues = {
  email: '',
  password: '',
}

const schema = object({
  email: string().email().required().max(50),
  password: string().required().max(50),
})

export default function SignIn() {
  const { formatMessage } = useIntl()
  const navigate = useNavigate()
  const [message, updateMessage, clear] = useMessage()
  const [isMasked, setMasked] = React.useState(true)
  const dispatch = useDispatch()

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
    http
      .post('/api/auth/login', data)
      .then((res) => {
        dispatch(setUser(res.data))
        navigate('/', { replace: true })
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
  }

  const unMasker = (
    <button
      type="button"
      className={classNames('change-type', { isMasked })}
      onClick={() => setMasked((prev) => !prev)}
    >
      <Eye />
    </button>
  )

  return (
    <Page>
      {message ? (
        <BackdropMessage onClose={clear} type={message.type}>
          {message.text}
        </BackdropMessage>
      ) : null}
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="email"
            label={formatMessage({
              id: 'signUp:EmailLabel',
              defaultMessage: 'Email',
            })}
            error={errors.email?.message}
            input={{
              ...register('email'),
              placeholder: formatMessage({
                id: 'signUp:EmailPlaceholder',
                defaultMessage: 'Enter your registered email address',
              }),
            }}
          />
          <TextField
            id="password"
            className="password"
            adornment={unMasker}
            label={formatMessage({
              id: 'pwSetup:PasswordLabel',
              defaultMessage: 'Password',
            })}
            error={errors.password?.message}
            input={{
              ...register('password'),
              placeholder: formatMessage({
                id: 'pwSetup:PasswordPlaceholder',
                defaultMessage: 'Enter your password',
              }),
              type: isMasked ? 'password' : 'text',
            }}
          />
          <Text className="text-end forgotten-password">
            <Link to="forgotten-password">
              <FormattedMessage
                id="signIn:ForgottenPassword"
                defaultMessage="Forgotten password?"
              />
            </Link>
          </Text>
          <Button
            disabled={!(dirtyFields.email && dirtyFields.password)}
            type="submit"
          >
            <FormattedMessage
              id="signIn:SubmitButton"
              defaultMessage="Sign in"
            />
          </Button>
        </form>
        <SocialLogin />
        <div className="link-row">
          <Link to="/registration" className="registration-link">
            <TextPrimary>
              <FormattedMessage
                id="signIn:SignUp"
                defaultMessage="Create an account"
              />
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
  }

  .password {
    .input-wrapper {
      position: relative;

      input {
        padding: 9px 46px 9px 22px;
      }
    }

    .change-type {
      position: absolute;
      top: calc(50% - 12px);
      right: 25px;
      width: 24px;
      height: 24px;

      svg path {
        fill: ${({ theme }) => theme.textPrimary};
      }

      &.isMasked {
        svg path {
          fill: ${({ theme }) => theme.disabledInputText};
        }
      }
    }
  }

  .text-field + .text-field {
    margin-top: 20px;
  }

  .text-field + .forgotten-password {
    margin: 20px 0 30px;
    color: ${({ theme }) => theme.main};
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 62px 0 50px;
  }
`
