import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import queryString from 'query-string'
import { Link, useLocation } from 'react-router-dom'
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
export const CARREFOUR_CARD = 'carrefour'
export const PASS_CARD = 'pass'

export default function SetCarrefourLoyaltyId() {
  const location = useLocation()
  const { fromRewards } = queryString.parse(location.search)
  const [card, setCard] = useState(CARREFOUR_CARD)
  const [loyaltyCode, setLoyaltyCode] = useState('913572')
  const [, updateMessage] = useMessageContext()

  const codeIsValid = validateCode(card, loyaltyCode)

  useEffect(() => {
    if (card === CARREFOUR_CARD) setLoyaltyCode('913572')
    else if (card === PASS_CARD) setLoyaltyCode('0')
  }, [card])

  function cardChange(newCard) {
    if (newCard !== CARREFOUR_CARD && newCard !== PASS_CARD) return
    setCard(newCard)
  }

  function getLink() {
    if (fromRewards) return '/rewards'
    return '/'
  }

  function getPlaceholder() {
    if (card === PASS_CARD) return '0_______________'
    return '913572_____________'
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
            id="carrefourLoyaltyId:Description"
            defaultMessage="Choose your loyalty program:"
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

export function EnterLoyalty({ loyaltyCode, setLoyaltyCode, getPlaceholder }) {
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
            learnMore: (
              <button
                type="button"
                aria-label="learn more"
                className={classes.learnMoreBtn}
                onClick={() => setShowHint(true)}
              />
            ),
          }}
        />
      </p>
      <label className="my-text-label my-color-main" htmlFor="opt-code">
        <FormattedMessage
          id="carrefourLoyaltyId:InputLabel"
          defaultMessage="Loyalty ID number"
        />
      </label>
      <OtpInput
        value={loyaltyCode}
        onChange={(value) => setLoyaltyCode(value)}
        numInputs={getPlaceholder().length}
        placeholder={getPlaceholder()}
        containerStyle={classNames(
          classes.inputWrapper,
          'd-flex',
          'w-auto',
          'my-bg-color-secondary',
        )}
        isInputNum
      />
      {showHint && <CarrefourLoyaltyHint closePop={() => setShowHint(false)} />}
    </>
  )
}
EnterLoyalty.propTypes = {
  loyaltyCode: PropTypes.string,
  setLoyaltyCode: PropTypes.func,
  getPlaceholder: PropTypes.func,
}

function validateCarrefour(loyaltyCode) {
  // should start with 913572
  // only consist of digits
  // and have total length of 19
  return /^913572\d{13}$/.test(loyaltyCode)
}

function validatePass(loyaltyCode) {
  // should start with 055 or 065 or 075
  // only consist of digits
  // and have total length of 16
  return /^(055|065|075)\d{13}$/.test(loyaltyCode)
}

export function validateCode(card, loyaltyCode) {
  return card === CARREFOUR_CARD
    ? validateCarrefour(loyaltyCode)
    : validatePass(loyaltyCode)
}

export const luhnCheck = (input) => {
  if (!input || !/[0-9-\s]+/.test(input)) return false
  let inputCopy = input
  let nCheck = 0

  inputCopy = inputCopy.replace(/\D/g, '')
  inputCopy.split('').forEach((v, n) => {
    let nDigit = parseInt(v, 10)
    // eslint-disable-next-line no-cond-assign
    if (!((inputCopy.length + n) % 2) && (inputCopy *= 2) > 9) {
      nDigit -= 9
    }
    nCheck += nDigit
  })

  return nCheck % 10 === 0
}
