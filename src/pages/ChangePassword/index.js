import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, ref } from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import FooterNav from '../../components/FooterNav'
import useMessage from '../../utils/useMessage'
import BackdropMessage from '../../components/Message/BackdropMessage'
import { ReactComponent as Eye } from '../../assets/icons/password-mask.svg'
import { PASSWORD_REG } from '../../utils/const'
import http from '../../utils/http'
import extractErrorMessage from '../../utils/extractErrorMessage'

const textInputs = [
  {
    name: 'current',
    label: { id: 'changePassword:Current', defaultMessage: 'Current password' },
    placeholder: {
      id: 'changePassword:CurrentPlaceholder',
      defaultMessage: 'Enter your password',
    },
  },
  {
    name: 'next',
    label: { id: 'changePassword:Next', defaultMessage: 'New password' },
    placeholder: {
      id: 'changePassword:NextPlaceholder',
      defaultMessage: 'Enter your new password',
    },
  },
  {
    name: 'confirm',
    label: {
      id: 'changePassword:Confirm',
      defaultMessage: 'Confirm new password',
    },
    placeholder: {
      id: 'changePassword:ConfirmPlaceholder',
      defaultMessage: 'Confirm your new password',
    },
  },
]

export default function ChangePassword() {
  const navigate = useNavigate()
  const { authorization } = useSelector((state) => state.user)
  const [message, updateMessage, clear] = useMessage()
  const [masked, setMasked] = React.useState([true, true, true])
  const defaultValues = {
    current: '',
    next: '',
    confirm: '',
  }
  const { formatMessage } = useIntl()

  const pwErrorMessage = formatMessage({
    id: 'pwSetup:PasswordError',
    defaultMessage:
      'Password must be at least 8 characters long. Password must contain at least one lowercase character, one uppercase character and one non-alphanumeric character.',
  })

  const schema = object({
    current: string().required().max(50),
    next: string()
      .required()
      .min(8, pwErrorMessage)
      .matches(PASSWORD_REG, pwErrorMessage),
    confirm: string()
      .required()
      .oneOf(
        [ref('next')],
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

  const onSubmit = (data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    }

    const values = {
      oldPassword: data.current,
      newPassword: data.next,
    }
    http
      .put('/api/user/updatePassword', values, config)
      .then(() => {
        updateMessage(
          {
            type: 'success',
            text: formatMessage({
              id: 'changePassword:SaveSuccess',
              defaultMessage: 'Saved successfully',
            }),
          },
          10000,
        )
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
  }

  let messageContent = null

  if (message) {
    messageContent = (
      <BackdropMessage onClose={clear} type={message.type}>
        {message.text}
      </BackdropMessage>
    )
  }

  return (
    <Page
      title={
        <FormattedMessage
          id="changePassword:Title"
          defaultMessage="Change password"
        />
      }
      backButton
    >
      {messageContent}
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {textInputs.map(({ name, label, placeholder }, i) => (
            <TextField
              key={name}
              id={name}
              label={formatMessage(label)}
              error={errors[name]?.message}
              adornment={
                <Unmasker
                  isMasked={masked[i]}
                  onClick={() =>
                    setMasked((prev) => {
                      const nextValue = prev.slice(0)
                      nextValue[i] = !prev[i]
                      return nextValue
                    })
                  }
                />
              }
              input={{
                ...register(name),
                placeholder: formatMessage(placeholder),
                type: masked[i] ? 'password' : 'text',
              }}
            />
          ))}
          <Button
            disabled={isSubmitted && !isValid}
            className="submit-btn"
            type="submit"
          >
            <FormattedMessage
              id="profileEdit:SubmitButton"
              defaultMessage="Save information"
            />
          </Button>
        </form>
        <Button
          inverted
          type="button"
          className="cancel-btn"
          onClick={() => navigate(-1)}
        >
          <FormattedMessage id="profileEdit:Cancel" defaultMessage="Cancel" />
        </Button>
      </Wrapper>
      <FooterNav className="start-0" />
    </Page>
  )
}

function Unmasker({ onClick, isMasked }) {
  return (
    <UnmaskerWrapper
      type="button"
      className={classNames({ isMasked })}
      onClick={onClick}
    >
      <Eye />
    </UnmaskerWrapper>
  )
}

Unmasker.propTypes = {
  onClick: PropTypes.func,
  isMasked: PropTypes.bool,
}

const Wrapper = styled.div`
  form {
    .text-field {
      margin-bottom: 20px;
    }

    .submit-btn {
      margin-top: 30px;
    }
  }

  .cancel-btn {
    margin-top: 20px;
  }

  .delete-btn {
    margin-top: 23px;
    margin-bottom: 40px;

    svg {
      margin-right: 8px;
    }
  }
`

const UnmaskerWrapper = styled.button`
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
`
