import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object } from 'yup'

import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import classes from './RetailersIdEdit.module.scss'
import { ReactComponent as Trash } from '../../assets/icons/trash.svg'
import { useMessageContext } from '../../context/message'
import useApiCall from '../../utils/useApiCall'
import TextField from '../../components/TextField'
import Unmasker from '../../components/Icons/Unmasker'

export default function RetailersIdEdit() {
  const location = useLocation()
  const navigate = useNavigate()
  const retailer = location?.state?.retailer
  const retailerId = location?.state?.userRetailerCode
  const [masked, setMasked] = React.useState(true)
  const [, updateMessage] = useMessageContext()
  const { formatMessage } = useIntl()
  const submitApiCall = useApiCall()

  const schema = object({
    code: string()
      .length(
        17,
        formatMessage({
          id: 'retailerIdEdit:LengthError',
          defaultMessage: 'Length must be 17 characters',
        }),
      )
      .required(
        formatMessage({
          id: 'retailerIdEdit:Required',
          defaultMessage: 'This field is required',
        }),
      )
      .matches(
        /^605908/,
        formatMessage({
          id: 'retailerIdEdit:PatternError',
          defaultMessage: "Retailer's id must start with 605908",
        }),
      ),
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { code: retailerId || '' },
    resolver: yupResolver(schema),
  })

  function submitSuccessCb() {
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'retailerIdEdit:Success',
          defaultMessage: 'Successfully added retailer’s ID!',
        }),
      },
      10000,
    )
    navigate(location.pathname, {
      replace: true,
      state: { ...location.state, userRetailerCode: getValues().code },
    })
  }

  function submitHandler({ code }) {
    const data = {
      retailerId: retailer,
      userRetailerCode: code,
    }

    submitApiCall(() => http.put('/api/user/retailer', data), submitSuccessCb)
  }

  function deleteId() {
    deleteApiCall(
      () =>
        http.delete('/api/user/retailer', { data: { retailerId: retailer } }),
      deleteSuccessCb,
    )
  }

  const deleteApiCall = useApiCall()

  const deleteSuccessCb = () => {
    setValue('code', '')
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'retailerIdEdit:DeleteSuccess',
          defaultMessage: 'Successfully removed retailer’s ID!',
        }),
        onClose: () => navigate('../retailer-list', { replace: true }),
      },
      10000,
    )
  }

  return (
    <Page footer>
      <div className={classes.wrapper}>
        <p
          className={classNames(
            classes.description,
            'text-md-center',
            'my-text',
            'my-color-textPrimary',
          )}
        >
          <FormattedMessage
            id="retailerIdEdit:Description"
            defaultMessage="Edit your retailer’s ID here:"
          />
        </p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div
            className={classNames(
              classes.codeInput,
              'd-flex',
              'align-items-center',
              'justify-content-center',
              'justify-content-md-start',
            )}
          >
            <TextField
              id="code"
              className="w-100"
              label={formatMessage({
                id: 'retailerIdEdit:InputLabel',
                defaultMessage: 'Retailor’s ID',
              })}
              error={errors.code?.message}
              adornment={
                <Unmasker
                  isMasked={masked}
                  onClick={() => setMasked((prev) => !prev)}
                />
              }
              input={{
                ...register('code'),
                placeholder: formatMessage({
                  id: 'retailerIdEdit:Placeholder',
                  defaultMessage: "Enter your retailer's ID",
                }),
                type: masked ? 'password' : 'text',
              }}
            />
          </div>
          <Button disabled={!isValid} type="submit">
            <FormattedMessage
              id="retailerIdEdit:SubmitButton"
              defaultMessage="Save"
            />
          </Button>
        </form>
        <DeleteButton onClick={deleteId} />
      </div>
    </Page>
  )
}

function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      className={classNames(
        classes.deleteBtn,
        'my-color-error',
        'my-text',
        'd-flex',
        'align-items-center',
        'mx-auto',
      )}
      onClick={onClick}
    >
      <Trash />
      <span>
        <FormattedMessage
          id="retailerIdEdit:DeleteId"
          defaultMessage="Delete ID"
        />
      </span>
    </button>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
}
