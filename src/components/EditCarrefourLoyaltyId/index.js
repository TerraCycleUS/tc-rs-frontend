import React, { useState } from 'react'
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
  const [card, setCard] = useState(CARREFOUR_CARD)
  const location = useLocation()
  const retailerId = location?.state?.userRetailerCode
  const retailer = location?.state?.retailer
  const [loyaltyCode, setLoyaltyCode] = React.useState(retailerId || '')
  const codeIsValid = validateCode(card, loyaltyCode)
  const [, updateMessage] = useMessageContext()
  const navigate = useNavigate()
  const { formatMessage } = useIntl()

  function getPlaceholder() {
    if (card === PASS_CARD) return '0xxxxxxxxxxxxxx'
    return '913572xxxxxxxxxxxx'
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
          defaultMessage: 'Successfully removed retailer’s ID!',
        }),
        onClose: () => navigate('../retailer-list', { replace: true }),
      },
      10000,
    )
  }

  function submit() {
    let codeCopy = loyaltyCode
    if (card === PASS_CARD) codeCopy = codeCopy.concat('103', codeCopy)
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
    // TODO request to api
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

        <Link to="/">
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
