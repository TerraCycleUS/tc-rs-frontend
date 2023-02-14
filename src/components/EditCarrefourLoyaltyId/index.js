import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  CardSetter,
  CARREFOUR_CARD,
  EnterLoyalty,
  PASS_CARD,
  submitValidation,
  validateLoyaltyCodes,
} from '../SetCarrefourLoyaltyId'
import classes from './EditCarrefourLoyaltyId.module.scss'
import Page from '../../Layouts/Page'
import Button from '../Button'
import { useMessageContext } from '../../context/message'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import { DeleteButton } from '../EditMonoprixLoyaltyId'

export default function EditCarrefourLoyaltyId() {
  const oneRetailer = parseInt(process.env.REACT_APP_ONE_RETAILER, 10)
  const location = useLocation()
  const scannedCardNumbers = location.state?.cardNumbers
  const userLoyaltyCode = location?.state?.userLoyaltyCode
  const userLoyaltyPassCode = location?.state?.userLoyaltyPassCode?.replace(
    /^103/gm,
    '',
  )
  const whichCardWasSet = userLoyaltyCode ? CARREFOUR_CARD : PASS_CARD
  const whichCardWasScanned =
    scannedCardNumbers?.length <= 16 ? PASS_CARD : CARREFOUR_CARD
  const [card, setCard] = useState(
    scannedCardNumbers ? whichCardWasScanned : whichCardWasSet,
  )
  const retailer = location?.state?.retailer
  const [loyaltyCode, setLoyaltyCode] = React.useState(
    scannedCardNumbers?.length > 16 ? scannedCardNumbers : userLoyaltyCode,
  )
  const [loyaltyPassCode, setLoyaltyPassCode] = React.useState(
    scannedCardNumbers?.length <= 16 ? scannedCardNumbers : userLoyaltyPassCode,
  )
  const loyaltyCodesValidation = validateLoyaltyCodes(
    loyaltyCode,
    loyaltyPassCode,
  )
  const disabled = !Object.values(loyaltyCodesValidation)?.some((code) => code)
  const [, updateMessage] = useMessageContext()
  const navigate = useNavigate()
  const { formatMessage } = useIntl()
  const submitApiCall = useApiCall()

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

  function onSubmit() {
    const data = submitValidation(
      loyaltyCode,
      loyaltyPassCode,
      loyaltyCodesValidation,
      updateMessage,
      retailer,
    )
    if (!data) return

    const noRetailerWasSaved = !userLoyaltyCode && !userLoyaltyPassCode
    if (noRetailerWasSaved && oneRetailer) {
      submitApiCall(
        () =>
          http
            .post('/api/retailer/assign', {
              retailerId: retailer,
            })
            .then(() => http.put('/api/user/retailer', data)),
        submitSuccessCb,
      )
    } else {
      submitApiCall(() => http.put('/api/user/retailer', data), submitSuccessCb)
    }
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
          card={card}
          loyaltyCode={loyaltyCode}
          setLoyaltyCode={setLoyaltyCode}
          loyaltyPassCode={loyaltyPassCode}
          setLoyaltyPassCode={setLoyaltyPassCode}
        />

        <Button
          className={classes.saveBtn}
          onClick={() => onSubmit()}
          disabled={disabled}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:Save"
            defaultMessage="Save"
          />
        </Button>

        <Link
          to="/scan-loyalty-card"
          replace
          state={{ fromEdit: true, userLoyaltyCode, userLoyaltyPassCode }}
        >
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
