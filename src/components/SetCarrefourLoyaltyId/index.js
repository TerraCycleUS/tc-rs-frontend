import React, { useState } from "react";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import queryString from "query-string";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./SetCarrefourLoyaltyId.module.scss";
import carrefourCard from "../../assets/images/carrefour-card.png";
import passCard from "../../assets/images/pass-card.png";
import Button from "../Button";
import OtpInput from "../OtpInput";
import { useMessageContext } from "../../context/message";
import Page from "../../Layouts/Page";
import CarrefourLoyaltyHint from "../PopUps/CarrefourLoyaltyHint";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import LearnMoreBtn from "../LearnMoreBtn";
export const CARREFOUR_LOYALTY_CODE = "carrefour_loyalty_code";
export const CARREFOUR_PASS_LOYALTY_CODE = "carrefour_pass_loyalty_code";
const LOYALTY_CODE_DEFAULT = "913572";
const LOYALTY_PASS_CODE_DEFAULT = "";

export default function SetCarrefourLoyaltyId() {
  const location = useLocation();
  const scannedCardNumbers = location.state?.cardNumbers;
  const { fromRewards, redirect } = queryString.parse(location.search);
  const [card, setCard] = useState(
    scannedCardNumbers?.length <= 16
      ? CARREFOUR_PASS_LOYALTY_CODE
      : CARREFOUR_LOYALTY_CODE
  );
  const [loyaltyCode, setLoyaltyCode] = useState(
    scannedCardNumbers?.length > 16 ? scannedCardNumbers : LOYALTY_CODE_DEFAULT
  );
  const [loyaltyPassCode, setLoyaltyPassCode] = useState(
    scannedCardNumbers?.length <= 16
      ? scannedCardNumbers
      : LOYALTY_PASS_CODE_DEFAULT
  );
  const [, updateMessage] = useMessageContext();
  const apiCall = useApiCall();
  const retailer = location?.state?.retailer;
  const loyaltyCodesValidation = validateLoyaltyCodes(
    loyaltyCode,
    loyaltyPassCode
  );

  const disabled = !Object.values(loyaltyCodesValidation)?.some((code) => code);
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  function cardChange(newCard) {
    if (
      newCard !== CARREFOUR_LOYALTY_CODE &&
      newCard !== CARREFOUR_PASS_LOYALTY_CODE
    )
      return;
    setCard(newCard);
  }

  function getLink() {
    if (fromRewards) return "/rewards";
    return "/";
  }

  const successCb = () => {
    updateMessage(
      {
        type: "success",
        text: formatMessage({
          id: "carrefourLoyaltyId:Success",
          defaultMessage: "Successful Carrefour identification!",
        }),
        onClose: () => navigate(redirect || "/"),
      },
      10000
    );
  };

  const errorCb = () => {
    updateMessage(
      {
        type: "error",
        text: formatMessage({
          id: "carrefourLoyaltyId:Error",
          defaultMessage: "Unsuccessful Carrefour identification!",
        }),
      },
      10000
    );
  };

  function onSubmit() {
    const data = submitValidation(
      loyaltyCode,
      loyaltyPassCode,
      loyaltyCodesValidation,
      updateMessage,
      retailer
    );

    const noCodeWasValid = !data?.userLoyaltyCode && !data?.userLoyaltyPassCode;
    if (noCodeWasValid) {
      updateMessage({
        type: "error",
        text: formatMessage({
          id: "carrefourLoyaltyId:Error",
          defaultMessage: "Unsuccessful Carrefour identification!",
        }),
      });
      return;
    }

    apiCall(
      () =>
        http
          .post("/api/retailer/assign", {
            retailerId: retailer,
          })
          .then(() => http.put("/api/user/retailer", data)),
      successCb,
      errorCb
    );
  }

  return (
    <Page>
      <div className={classes.wrapper}>
        <p
          className={classNames(
            classes.description,
            "my-text",
            "my-color-textPrimary"
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
          onClick={() => onSubmit()}
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
            "text-center",
            "my-text",
            "my-color-textPrimary"
          )}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:dontHave"
            defaultMessage="Don’t have a Carrefour ID?"
          />
        </p>

        <Button
          as="a"
          href={process.env.REACT_APP_CREATE_NOW_CARREFOUR}
          target="_blank"
          className={classes.createNow}
          inverted
        >
          <FormattedMessage
            id="carrefourLoyaltyId:CreateNow"
            defaultMessage="Create now"
          />
        </Button>

        <p
          className={classNames(
            "text-center my-text-primary my-color-main",
            classes.skip
          )}
        >
          <Link to={getLink()}>
            <FormattedMessage
              id="carrefourLoyaltyId:Skip"
              defaultMessage="Skip for now"
            />
          </Link>
        </p>
      </div>
    </Page>
  );
}

export function CardSetter({ card, cardChange }) {
  function checkIfActive(currentCard) {
    if (currentCard !== card) return "";
    return "active";
  }
  const carrefourCardActive = checkIfActive(CARREFOUR_LOYALTY_CODE);
  const passCardActive = checkIfActive(CARREFOUR_PASS_LOYALTY_CODE);

  return (
    <div className={classes.cardsWrap}>
      <div className={classes.cardContainer}>
        <button
          type="button"
          disabled={card === CARREFOUR_LOYALTY_CODE}
          onClick={() => cardChange(CARREFOUR_LOYALTY_CODE)}
          className={classes.carrefourCardBtn}
        >
          <div
            className={classNames(classes.tick, classes[carrefourCardActive])}
          />
          <img
            className={classes.cardImage}
            src={carrefourCard}
            alt="Carrefour card"
          />
          <div
            className={classNames(classes.border, classes[carrefourCardActive])}
          />
        </button>
        <p
          className={classNames(
            classes.cardLabel,
            classes[carrefourCardActive]
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
          disabled={card === CARREFOUR_PASS_LOYALTY_CODE}
          onClick={() => cardChange(CARREFOUR_PASS_LOYALTY_CODE)}
          className={classes.passCardBtn}
        >
          <div className={classNames(classes.tick, classes[passCardActive])} />
          <img className={classes.cardImage} src={passCard} alt="Pass card" />
          <div
            className={classNames(classes.border, classes[passCardActive])}
          />
        </button>
        <p className={classNames(classes.cardLabel, classes[passCardActive])}>
          <FormattedMessage
            id="carrefourLoyaltyId:PassCard"
            defaultMessage="Pass Card"
          />
        </p>
      </div>
    </div>
  );
}
CardSetter.propTypes = {
  card: PropTypes.string,
  cardChange: PropTypes.func,
};

export function EnterLoyalty({
  card,
  loyaltyCode,
  setLoyaltyCode,
  loyaltyPassCode,
  setLoyaltyPassCode,
}) {
  const [showHint, setShowHint] = useState(false);

  return (
    <>
      <p
        className={classNames(
          classes.enterLoyalty,
          "my-text",
          "my-color-textPrimary"
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
      {card === CARREFOUR_LOYALTY_CODE ? (
        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
          <OtpInput
            value={loyaltyCode}
            onChange={(value) => setLoyaltyCode(value)}
            numInputs={19}
            placeholder="913572_____________"
            containerStyle={classNames(
              classes.inputWrapper,
              "d-flex",
              "w-auto",
              "my-bg-color-secondary"
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
          placeholder="________________"
          containerStyle={classNames(
            classes.inputWrapper,
            "d-flex",
            "w-auto",
            "my-bg-color-secondary"
          )}
          isInputNum
        />
      )}
      {showHint && <CarrefourLoyaltyHint closePop={() => setShowHint(false)} />}
    </>
  );
}
EnterLoyalty.propTypes = {
  card: PropTypes.string,
  loyaltyCode: PropTypes.string,
  setLoyaltyCode: PropTypes.func,
  loyaltyPassCode: PropTypes.string,
  setLoyaltyPassCode: PropTypes.func,
};

export function validateCarrefour(loyaltyCode) {
  // should start with 913572
  // only consist of digits
  // and have total length of 19
  return /^913572\d{13}$/.test(loyaltyCode);
}

export function validatePass(loyaltyPassCode) {
  // should start with 055 or 065 or 075
  // only consist of digits
  // and have total length of 16
  return /^(055|065|075)\d{13}$/.test(loyaltyPassCode);
}

export function validateLoyaltyCodes(loyaltyCode, loyaltyPassCode) {
  return {
    [CARREFOUR_LOYALTY_CODE]: validateCarrefour(loyaltyCode),
    [CARREFOUR_PASS_LOYALTY_CODE]: validatePass(loyaltyPassCode),
  };
}

export function submitValidation(
  loyaltyCode,
  loyaltyPassCode,
  loyaltyCodeValidation,
  updateMessage,
  retailer
) {
  const carrefourCardIsValid = luhnCheck(loyaltyCode);
  // the first 2 numbers and the last 4 numbers of the pass card identifier should not be taken into account when calculating the luhn key.

  // temporary commented for purposes of safe release //////////////
  // const passCardIsValid = luhnCheck(loyaltyPassCode?.slice(2, 12))
  // const bothCardsInvalid = !carrefourCardIsValid && !passCardIsValid

  // if (loyaltyCodeValidation?.pass && bothCardsInvalid) {
  //   updateMessage({
  //     type: 'error',
  //     text: (
  //       <FormattedMessage
  //         id="carrefourLoyaltyId:InvalidPass"
  //         defaultMessage="Pass card ID number is invalid"
  //       />
  //     ),
  //   })
  //   return null
  // }
  // temporary commented for purposes of safe release //////////////
  if (
    loyaltyCodeValidation?.[CARREFOUR_LOYALTY_CODE] &&
    !carrefourCardIsValid
  ) {
    updateMessage({
      type: "error",
      text: (
        <FormattedMessage
          id="carrefourLoyaltyId:InvalidCarrefour"
          defaultMessage="Carrefour card ID number is invalid"
        />
      ),
    });
    return null;
  }

  const data = {
    retailerId: retailer,
  };

  // we send to api only valid code
  // invalid code just won't be sent
  // pass code should start with 103
  // however user doesn't know this
  if (loyaltyCodeValidation?.[CARREFOUR_LOYALTY_CODE] && carrefourCardIsValid)
    data.userLoyaltyCode = loyaltyCode;
  if (loyaltyCodeValidation?.[CARREFOUR_PASS_LOYALTY_CODE])
    data.userLoyaltyPassCode = `103${loyaltyPassCode}`;
  return data;
}

export function luhnCheck(code) {
  let codeCopy = code;
  let nCheck = 0;
  if (codeCopy && /[0-9-\s]+/.test(codeCopy)) {
    codeCopy = codeCopy.replace(/\D/g, "");
    codeCopy.split("").forEach((v, n) => {
      let nDigit = parseInt(v, 10);
      // eslint-disable-next-line no-cond-assign
      if (!((codeCopy.length + n) % 2) && (nDigit *= 2) > 9) {
        nDigit -= 9;
      }
      nCheck += nDigit;
    });
  }
  return nCheck % 10 === 0;
}
