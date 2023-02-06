import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  CardSetter,
  CARREFOUR_CARD,
  EnterLoyalty,
  luhnCheck,
  PASS_CARD,
  validateCode,
} from '../SetCarrefourLoyaltyId'
import classes from './EditCarrefourLoyaltyId.module.scss'
import Page from '../../Layouts/Page'
import Button from '../Button'
import { useMessageContext } from '../../context/message'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import { DeleteButton } from '../EditMonoprixLoyaltyId'

export default function EditCarrefourLoyaltyId() {
  const location = useLocation()
  const scannedCardNumbers = location.state?.cardNumbers
  const userLoyaltyCode = location?.state?.userLoyaltyCode
  const userLoyaltyPassCode = location?.state?.userLoyaltyPassCode?.replace(
    /^103/gm,
    '',
  )
  const [card, setCard] = useState(userLoyaltyCode ? CARREFOUR_CARD : PASS_CARD)
  const retailer = location?.state?.retailer
  const [loyaltyCode, setLoyaltyCode] = React.useState(userLoyaltyCode || '')
  const codeIsValid = validateCode(card, loyaltyCode)
  const [, updateMessage] = useMessageContext()
  const navigate = useNavigate()
  const { formatMessage } = useIntl()
  const submitApiCall = useApiCall()

  useEffect(() => {
    if (scannedCardNumbers) setLoyaltyCode(scannedCardNumbers)
    else if (card === CARREFOUR_CARD) setLoyaltyCode(userLoyaltyCode)
    else if (card === PASS_CARD) setLoyaltyCode(userLoyaltyPassCode)
  }, [card, scannedCardNumbers, userLoyaltyCode, userLoyaltyPassCode])

  function getPlaceholder() {
    if (card === PASS_CARD) return '0xxxxxxxxxxxxxxx'
    return '913572xxxxxxxxxxxxx'
  }

  function cardChange(newCard) {
    if (newCard !== CARREFOUR_CARD && newCard !== PASS_CARD) return
    setCard(newCard)
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
    setLoyaltyCode('')
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'retailerIdEdit:DeleteSuccess',
          defaultMessage: 'Successfully removed loyalty ID!',
        }),
        onClose: () => navigate(-1, { replace: true }),
      },
      10000,
    )
  }

  function submitSuccessCb() {
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'retailerIdEdit:Success',
          defaultMessage: 'Successfully added loyalty ID!',
        }),
      },
      10000,
    )
    const state = { ...location.state }
    if (card === PASS_CARD) state.userLoyaltyPassCode = `103${loyaltyCode}`
    else state.userLoyaltyCode = loyaltyCode
    navigate(location.pathname, {
      replace: true,
      state,
    })
  }

  function submit() {
    let codeCopy = loyaltyCode
    if (card === PASS_CARD) codeCopy = `103${codeCopy}`
    if (!luhnCheck(codeCopy)) {
      updateMessage({
        type: 'error',
        text: (
          <FormattedMessage
            id="carrefourLoyaltyId:Invalid"
            defaultMessage="Loyalty ID number is invalid"
          />
        ),
      })
      // eslint-disable-next-line no-useless-return
      return
    }

    const data = {
      retailerId: retailer,
    }

    if (card === CARREFOUR_CARD) data.userLoyaltyCode = codeCopy
    else data.userLoyaltyPassCode = codeCopy

    submitApiCall(() => http.put('/api/user/retailer', data), submitSuccessCb)
  }

  return (
    <Page>
      <div className={classes.wrapper}>
        <p
          className={classNames(
            classes.description,
            'my-text',
            'my-color-textPrimary',
          )}
        >
          <FormattedMessage
            id="editCarrefourLoyaltyId:Description"
            defaultMessage="Edit or delete saved loyalty ID:"
          />
        </p>

        <CardSetter card={card} cardChange={cardChange} />

        <EnterLoyalty
          loyaltyCode={loyaltyCode}
          setLoyaltyCode={setLoyaltyCode}
          getPlaceholder={getPlaceholder}
        />

        <Button
          className={classes.saveBtn}
          onClick={() => submit()}
          disabled={!codeIsValid}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:Save"
            defaultMessage="Save"
          />
        </Button>

        <Link to="/scan-loyalty-card" state={{ fromEdit: true }}>
          <Button className={classes.takePicture} inverted>
            <FormattedMessage
              id="editCarrefourLoyaltyId:TakePicture"
              defaultMessage="Take a picture"
            />
          </Button>
        </Link>

        <DeleteButton onClick={deleteId} />
      </div>
    </Page>
  )
}
