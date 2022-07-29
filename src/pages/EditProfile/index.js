import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import { ReactComponent as Trash } from '../../assets/icons/trash.svg'
import useMessage from '../../utils/useMessage'
import BackdropMessage from '../../components/Message/BackdropMessage'
import DeletePopup from './DeletePopup'
import { updateUser } from '../../actions/user'
import http from '../../utils/http'
import extractErrorMessage from '../../utils/extractErrorMessage'
import useLogout from '../../utils/useLogout'

const schema = object({
  name: string()
    .required()
    .min(
      3,
      <FormattedMessage
        id="profileEdit:NameError"
        defaultMessage="Name must be at least 3 characters long and 30 characters at most."
      />,
    )
    .max(
      50,
      <FormattedMessage
        id="profileEdit:NameError"
        defaultMessage="Name must be at least 3 characters long and 30 characters at most."
      />,
    ),
  email: string()
    .email()
    .required()
    .max(
      100,
      <FormattedMessage
        id="profileEdit:EmailError"
        defaultMessage="Name must be 50 characters at most."
      />,
    ),
  zipcode: string().required(),
})

const textInputs = [
  {
    name: 'name',
    label: { id: 'profileEdit:NameLabel', defaultMessage: 'Name' },
    placeholder: {
      id: 'profileEdit:NamePlaceholder',
      defaultMessage: 'Enter your name',
    },
  },
  {
    name: 'email',
    label: { id: 'profileEdit:EmailLabel', defaultMessage: 'Email address' },
    placeholder: {
      id: 'profileEdit:EmailPlaceholder',
      defaultMessage: 'Enter your registered email address',
    },
  },
  {
    name: 'zipcode',
    label: { id: 'profileEdit:ZipLabel', defaultMessage: 'Postcode' },
    placeholder: {
      id: 'profileEdit:ZipPlaceholder',
      defaultMessage: 'Enter your Postcode',
    },
  },
]

export default function EditProfile() {
  const navigate = useNavigate()
  const { name, email, zipcode, authorization } = useSelector(
    (state) => state.user,
  )
  const dispatch = useDispatch()
  const [message, updateMessage, clear] = useMessage()
  const defaultValues = { name, email, zipcode }
  const { formatMessage } = useIntl()
  const [deletePopup, setDeletePopup] = React.useState(false)

  const logout = useLogout()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const config = {
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  }

  const onSubmit = (data) => {
    http
      .put('/api/user/updateProfile', data, config)
      .then(({ data: resData }) => {
        dispatch(
          updateUser({
            name: resData.name,
            email: resData.email,
            zipcode: resData.zipcode,
          }),
        )
        updateMessage(
          {
            type: 'success',
            text: formatMessage({
              id: 'profileEdit:SaveSuccess',
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

  function deleteUser() {
    http
      .delete('/api/user', config)
      .then(() => {
        logout()
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
      .finally(() => setDeletePopup(false))
  }

  return (
    <Page footer>
      {messageContent}
      {deletePopup ? (
        <DeletePopup
          onContinue={deleteUser}
          onCancel={() => setDeletePopup(false)}
        />
      ) : null}
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {textInputs.map(({ name: id, label, placeholder }) => (
            <TextField
              key={id}
              id={id}
              label={formatMessage(label)}
              error={errors[id]?.message}
              input={{
                ...register(id),
                placeholder: formatMessage(placeholder),
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
        <button
          type="button"
          className="my-color-error my-text d-flex align-items-center delete-btn mx-auto"
          onClick={() => setDeletePopup(true)}
        >
          <Trash />
          <span>
            <FormattedMessage
              id="profileEdit:DeleteAccount"
              defaultMessage="Delete account"
            />
          </span>
        </button>
      </Wrapper>
    </Page>
  )
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
