import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import OtpInput from '../../components/OtpInput'
import { updateUser } from '../../actions/user'
import classes from './Monoprixid.module.scss'
import { ReactComponent as Trash } from '../../assets/icons/trash.svg'
import CreateNow from '../../components/PopUps/CreateNow'
import { useMessageContext } from '../../context/message'
import useApiCall from '../../utils/useApiCall'
import validateRetailersId from '../../utils/validateRetailersId'
import Checkbox from '../../components/Checkbox'

export default function MonoprixId() {
  const { authorization, retailerId } = useSelector((state) => state.user)
  const [{ code, isNum }, setCode] = React.useState({
    code: retailerId || '',
    isNum: true,
  })
  const [show, setShow] = React.useState(false)
  const [permission, setPermission] = useState(false)
  const [, updateMessage] = useMessageContext()
  const { formatMessage } = useIntl()
  const dispatch = useDispatch()
  const submitApiCall = useApiCall()

  const submitSuccessCb = (response) => {
    dispatch(updateUser({ retailerId: response.data.retailerId }))
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'retailersId:Success',
          defaultMessage: 'Successfully added retailer’s ID!',
        }),
      },
      10000,
    )
  }

  const deleteApiCall = useApiCall()

  const deleteSuccessCb = () => {
    setCode((prev) => ({
      isNum: prev.isNum,
      code: '',
    }))
    dispatch(updateUser({ retailerId: null }))
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'retailersId:DeleteSuccess',
          defaultMessage: 'Successfully removed retailer’s ID!',
        }),
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
      retailerId: code,
    }

    submitApiCall(
      () => http.put('/api/user/updateProfile', data, config),
      submitSuccessCb,
    )
  }

  function deleteId() {
    deleteApiCall(
      () => http.put('/api/user/updateProfile', { retailerId: null }, config),
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
            id="monoprixId:Description"
            defaultMessage="Please enter the number on your Monoprix card so that your coupons can appear in your Monoprix account: "
          />
        </p>
        <form onSubmit={submitHandler}>
          <label className="my-text-label my-color-main" htmlFor="opt-code">
            <FormattedMessage
              id="monoprixId:InputLabel"
              defaultMessage="Monoprix ID"
            />
          </label>
          <div
            className={classNames(
              classes.codeInput,
              'd-flex',
              'align-items-center',
              'justify-content-center',
              'justify-content-md-start',
            )}
          >
            <OtpInput
              value={code}
              validate={(char, i) => {
                const newValue = code.split('')
                const deleteCount = newValue[i] !== undefined ? 1 : 0
                newValue.splice(i, deleteCount, char)
                return validateRetailersId(newValue)
              }}
              onChange={(value) => {
                setCode({ code: value, isNum: !/^\d{6}/.test(value) })
              }}
              numInputs={17}
              placeholder={'_'.repeat(17)}
              containerStyle={classNames(
                classes.inputWrapper,
                'd-flex',
                'w-auto',
                'my-bg-color-secondary',
              )}
              isInputNum={isNum}
              autoCapitalize="off"
              split={6}
              contentBetween={
                <span className="text-center flex-grow-1 flex-md-grow-0">
                  -
                </span>
              }
            />
          </div>
          <Button
            disabled={code.length < 17 || !permission}
            onClick={submitHandler}
            type="submit"
          >
            <FormattedMessage
              id="monoprixId:SubmitButton"
              defaultMessage="Save"
            />
          </Button>
        </form>
        {retailerId ? (
          <DeleteButton onClick={deleteId} />
        ) : (
          <NoIdContent
            onClick={() => setShow(true)}
            permission={permission}
            setPermission={setPermission}
          />
        )}
        {show ? <CreateNow setShow={setShow} /> : null}
      </div>
    </Page>
  )
}

function NoIdContent({ onClick, permission, setPermission }) {
  return (
    <>
      <div className={classes.descriptionBottom}>
        <Checkbox
          id="permission"
          input={{
            value: permission,
            onChange: () => setPermission(!permission),
          }}
        >
          <p className="my-text my-color-textPrimary">
            <FormattedMessage
              id="monoprixId:DescriptionBottom"
              defaultMessage="I accept that Terracycle shares my Monoprix ID so that Monoprix delivers the coupons on my Monoprix loyalty account."
            />
          </p>
        </Checkbox>
      </div>
      <p
        className={classNames(
          classes.noId,
          'text-center',
          'my-text',
          'my-color-textPrimary',
        )}
      >
        <FormattedMessage
          id="monoprixId:NoId"
          defaultMessage="Don’t have a Monoprix ID?"
        />
      </p>
      <Button inverted onClick={onClick}>
        <FormattedMessage id="monoprixId:Create" defaultMessage="Set up ID" />
      </Button>
    </>
  )
}

NoIdContent.propTypes = {
  onClick: PropTypes.func,
  permission: PropTypes.bool,
  setPermission: PropTypes.func,
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
