import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

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
  const { authorization } = useSelector((state) => state.user)
  const location = useLocation()
  const navigate = useNavigate()
  const retailer = location?.state?.retailer
  const retailerId = location?.state?.userRetailerCode
  const [code, setCode] = React.useState(retailerId)
  const [masked, setMasked] = React.useState(true)
  const [, updateMessage] = useMessageContext()
  const { formatMessage } = useIntl()
  const submitApiCall = useApiCall()

  const submitSuccessCb = () => {
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
      state: { ...location.state, userRetailerCode: code },
    })
  }

  const deleteApiCall = useApiCall()

  const deleteSuccessCb = () => {
    setCode('')
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

  const config = {
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      retailerId: retailer,
      userRetailerCode: code,
    }

    submitApiCall(
      () => http.put('/api/user/retailer', data, config),
      submitSuccessCb,
    )
  }

  function deleteId() {
    config.data = { retailerId: retailer }
    deleteApiCall(
      () => http.delete('/api/user/retailer', config),
      deleteSuccessCb,
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
        <form onSubmit={submitHandler}>
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
              adornment={
                <Unmasker
                  isMasked={masked}
                  onClick={() => setMasked((prev) => !prev)}
                />
              }
              input={{
                onChange: (e) => setCode(e.target.value),
                value: code,
                placeholder: formatMessage({
                  id: 'retailerIdEdit:Placeholder',
                  defaultMessage: "Enter your retailer's ID",
                }),
                type: masked ? 'password' : 'text',
              }}
            />
          </div>
          <Button
            disabled={code.length < 17}
            onClick={submitHandler}
            type="submit"
          >
            <FormattedMessage
              id="monoprixId:SubmitButton"
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
        <FormattedMessage id="monoprixId:DeleteId" defaultMessage="Delete ID" />
      </span>
    </button>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
}
