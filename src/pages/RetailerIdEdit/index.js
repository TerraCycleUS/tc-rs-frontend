import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useLocation, useNavigate } from 'react-router-dom'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import classes from './RetailersIdEdit.module.scss'
import { ReactComponent as Trash } from '../../assets/icons/trash.svg'
import { useMessageContext } from '../../context/message'
import useApiCall from '../../utils/useApiCall'
import MonoprixId from '../MonoprixId'

export default function RetailersIdEdit() {
  const location = useLocation()
  const retailerId = location?.state?.userRetailerCode
  const [{ code, isNum }, setCode] = React.useState({
    code: retailerId || '',
    isNum: true,
  })
  const navigate = useNavigate()
  const retailer = location?.state?.retailer
  const [, updateMessage] = useMessageContext()
  const { formatMessage } = useIntl()
  const submitApiCall = useApiCall()

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
      state: { ...location.state, userRetailerCode: code },
    })
  }

  function submitHandler() {
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
    setCode({ code: '', isNum: true })
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
        <MonoprixId
          submitHandler={submitHandler}
          code={code}
          isNum={isNum}
          setCode={setCode}
        />
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
