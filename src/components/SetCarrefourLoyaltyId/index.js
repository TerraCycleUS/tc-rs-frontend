import React, { useState } from 'react'
import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import queryString from 'query-string'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './SetCarrefourLoyaltyId.module.scss'
import carrefourCard from '../../assets/images/carrefour-card.png'
import passCard from '../../assets/images/pass-card.png'
import { ReactComponent as Tick } from '../../assets/icons/card-tick.svg'
import Button from '../Button'
import OtpInput from '../OtpInput'
import { useMessageContext } from '../../context/message'
import Page from '../../Layouts/Page'
import CarrefourLoyaltyHint from '../PopUps/CarrefourLoyaltyHint'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import LearnMoreBtn from '../LearnMoreBtn'
export const CARREFOUR_CARD = 'carrefour'
export const PASS_CARD = 'pass'
const LOYALTY_CODE_DEFAULT = '913572'
const LOYALTY_PASS_CODE_DEFAULT = '0'

export default function SetCarrefourLoyaltyId() {
  const location = useLocation()
  const scannedCardNumbers = location.state?.cardNumbers
  const { fromRewards } = queryString.parse(location.search)
  const [card, setCard] = useState(
    scannedCardNumbers?.length <= 16 ? PASS_CARD : CARREFOUR_CARD,
  )
  const [loyaltyCode, setLoyaltyCode] = useState(
    scannedCardNumbers?.length > 16 ? scannedCardNumbers : LOYALTY_CODE_DEFAULT,
  )
  const [loyaltyPassCode, setLoyaltyPassCode] = useState(
    scannedCardNumbers?.length <= 16
      ? scannedCardNumbers
      : LOYALTY_PASS_CODE_DEFAULT,
  )
  const [, updateMessage] = useMessageContext()
  const apiCall = useApiCall()
  const retailer = location?.state?.retailer
  const loyaltyCodeValidation = validateLoyaltyCodes(
    loyaltyCode,
    loyaltyPassCode,
  )

  const disabled = !Object.values(loyaltyCodeValidation)?.some((code) => code)
  const { formatMessage } = useIntl()
  const navigate = useNavigate()

  function cardChange(newCard) {
    if (newCard !== CARREFOUR_CARD && newCard !== PASS_CARD) return
    setCard(newCard)
  }

  function getLink() {
    if (fromRewards) return '/rewards'
    return '/'
  }

  const successCb = () => {
    updateMessage(
      {
        type: 'success',
        text: formatMessage({
          id: 'carrefourLoyaltyId:Success',
          defaultMessage: 'Successful Carrefour identification!',
        }),
        onClose: () => navigate('/'),
      },
      10000,
    )
  }

  const errorCb = () => {
    updateMessage(
      {
        type: 'error',
        text: formatMessage({
          id: 'carrefourLoyaltyId:Error',
          defaultMessage: 'Unsuccessful Carrefour identification!',
        }),
      },
      10000,
    )
  }

  function submit() {
    const passCodeCopy = `103${loyaltyPassCode}`
    if (loyaltyCodeValidation?.pass && !luhnCheck(passCodeCopy)) {
      updateMessage({
        type: 'error',
        text: (
          <FormattedMessage
            id="carrefourLoyaltyId:InvalidPass"
            defaultMessage="Pass card ID number is invalid"
          />
        ),
      })
      return
    }
    if (loyaltyCodeValidation?.carrefour && !luhnCheck(loyaltyCode)) {
      updateMessage({
        type: 'error',
        text: (
          <FormattedMessage
            id="carrefourLoyaltyId:InvalidCarrefour"
            defaultMessage="Carrefour card ID number is invalid"
          />
        ),
      })
      return
    }

    const data = {
      retailerId: retailer,
    }

    if (loyaltyCodeValidation?.carrefour) data.userLoyaltyCode = loyaltyCode
    if (loyaltyCodeValidation?.pass) data.userLoyaltyPassCode = passCodeCopy

    apiCall(
      () =>
        http
          .post('/api/retailer/assign', { retailerId: retailer })
          .then(() => http.put('/api/user/retailer', data)),
      successCb,
      errorCb,
    )
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
            id="carrefourLoyaltyId:Description"
            defaultMessage="Choose your loyalty program:"
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
          onClick={() => submit()}
          disabled={disabled}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:Save"
            defaultMessage="Save"
          />
        </Button>

        <p
          className={classNames(
            classes.dontHave,
            'text-center',
            'my-text',
            'my-color-textPrimary',
          )}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:dontHave"
            defaultMessage="Don’t have a Carrefour ID?"
          />
        </p>

        <Button className={classes.createNow} inverted>
          <FormattedMessage
            id="carrefourLoyaltyId:CreateNow"
            defaultMessage="Create now"
          />
        </Button>

        <p className="text-center my-text-primary my-color-main">
          <Link to={getLink()}>
            <FormattedMessage
              id="carrefourLoyaltyId:Skip"
              defaultMessage="Skip for now"
            />
          </Link>
        </p>
      </div>
    </Page>
  )
}

export function CardSetter({ card, cardChange }) {
  function checkIfActive(currentCard) {
    if (currentCard !== card) return ''
    return 'active'
  }

  return (
    <div className={classes.cardsWrap}>
      <div className={classes.cardContainer}>
        <button
          type="button"
          disabled={card === CARREFOUR_CARD}
          onClick={() => cardChange(CARREFOUR_CARD)}
          className={classes.carrefourCardBtn}
        >
          <Tick
            className={classNames(
              classes.tick,
              classes[checkIfActive(CARREFOUR_CARD)],
            )}
          />
          <img
            className={classes.cardImage}
            src={carrefourCard}
            alt="Carrefour card"
          />
          <div
            className={classNames(
              classes.border,
              classes[checkIfActive(CARREFOUR_CARD)],
            )}
          />
        </button>
        <p
          className={classNames(
            classes.cardLabel,
            classes[checkIfActive(CARREFOUR_CARD)],
          )}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:CarrefourCard"
            defaultMessage="Carrefour Card"
          />
        </p>
      </div>
      <div className={classes.cardContainer}>
        <button
          type="button"
          disabled={card === PASS_CARD}
          onClick={() => cardChange(PASS_CARD)}
          className={classes.passCardBtn}
        >
          <Tick
            className={classNames(
              classes.tick,
              classes[checkIfActive(PASS_CARD)],
            )}
          />
          <img className={classes.cardImage} src={passCard} alt="Pass card" />
          <div
            className={classNames(
              classes.border,
              classes[checkIfActive(PASS_CARD)],
            )}
          />
        </button>
        <p
          className={classNames(
            classes.cardLabel,
            classes[checkIfActive(PASS_CARD)],
          )}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:PassCard"
            defaultMessage="Pass Card"
          />
        </p>
      </div>
    </div>
  )
}
CardSetter.propTypes = {
  card: PropTypes.string,
  cardChange: PropTypes.func,
}

export function EnterLoyalty({
  card,
  loyaltyCode,
  setLoyaltyCode,
  loyaltyPassCode,
  setLoyaltyPassCode,
}) {
  const [showHint, setShowHint] = useState(false)

  return (
    <>
      <p
        className={classNames(
          classes.enterLoyalty,
          'my-text',
          'my-color-textPrimary',
        )}
      >
        <FormattedMessage
          id="carrefourLoyaltyId:EnterLoyalty"
          defaultMessage="Enter the loyalty ID number. {learnMore}"
          values={{
            learnMore: <LearnMoreBtn onClick={() => setShowHint(true)} />,
          }}
        />
      </p>
      <label className="my-text-label my-color-main" htmlFor="opt-code">
        <FormattedMessage
          id="carrefourLoyaltyId:InputLabel"
          defaultMessage="Loyalty ID number"
        />
      </label>
      {card === CARREFOUR_CARD ? (
        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
          <OtpInput
            value={loyaltyCode}
            onChange={(value) => setLoyaltyCode(value)}
            numInputs={19}
            placeholder="913572_____________"
            containerStyle={classNames(
              classes.inputWrapper,
              'd-flex',
              'w-auto',
              'my-bg-color-secondary',
            )}
            isInputNum
            split={6}
            contentBetween={
              <span
                className={`text-center flex-grow-1 flex-md-grow-0 ${classes.stroke}`}
              >
                -
              </span>
            }
          />
        </div>
      ) : (
        <OtpInput
          value={loyaltyPassCode}
          onChange={(value) => setLoyaltyPassCode(value)}
          numInputs={16}
          placeholder="0_______________"
          containerStyle={classNames(
            classes.inputWrapper,
            'd-flex',
            'w-auto',
            'my-bg-color-secondary',
          )}
          isInputNum
        />
      )}
      {showHint && <CarrefourLoyaltyHint closePop={() => setShowHint(false)} />}
    </>
  )
}
EnterLoyalty.propTypes = {
  card: PropTypes.string,
  loyaltyCode: PropTypes.string,
  setLoyaltyCode: PropTypes.func,
  loyaltyPassCode: PropTypes.string,
  setLoyaltyPassCode: PropTypes.func,
}

function validateCarrefour(loyaltyCode) {
  // should start with 913572
  // only consist of digits
  // and have total length of 19
  return /^913572\d{13}$/.test(loyaltyCode)
}

function validatePass(loyaltyPassCode) {
  // should start with 055 or 065 or 075
  // only consist of digits
  // and have total length of 16
  return /^(055|065|075)\d{13}$/.test(loyaltyPassCode)
}

export function validateLoyaltyCodes(loyaltyCode, loyaltyPassCode) {
  return {
    carrefour: validateCarrefour(loyaltyCode),
    pass: validatePass(loyaltyPassCode),
  }
}

export function luhnCheck(code) {
  let codeCopy = code
  let nCheck = 0
  if (codeCopy && /[0-9-\s]+/.test(codeCopy)) {
    codeCopy = codeCopy.replace(/\D/g, '')
    codeCopy.split('').forEach((v, n) => {
      let nDigit = parseInt(v, 10)
      // eslint-disable-next-line no-cond-assign
      if (!((codeCopy.length + n) % 2) && (nDigit *= 2) > 9) {
        nDigit -= 9
      }
      nCheck += nDigit
    })
  }
  return nCheck % 10 === 0
}
