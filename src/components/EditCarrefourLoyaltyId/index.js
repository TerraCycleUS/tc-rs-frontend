import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import {
  CardSetter,
  EnterLoyalty,
  CARREFOUR_LOYALTY_CODE,
  CARREFOUR_PASS_LOYALTY_CODE,
  submitValidation,
  validateLoyaltyCodes,
} from "../SetCarrefourLoyaltyId";
import classes from "./EditCarrefourLoyaltyId.module.scss";
import Page from "../../Layouts/Page";
import Button from "../Button";
import { useMessageContext } from "../../context/message";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import { DeleteButton } from "../EditMonoprixLoyaltyId";
import { CARREFOUR_ID } from "../../utils/const";

const codeTypeToParamMap = {
  [CARREFOUR_PASS_LOYALTY_CODE]: "loyalty_pass_code",
  [CARREFOUR_LOYALTY_CODE]: "loyalty_code",
};

const codeTypeToCodeVarMap = {
  [CARREFOUR_PASS_LOYALTY_CODE]: "userLoyaltyPassCode",
  [CARREFOUR_LOYALTY_CODE]: "userLoyaltyCode",
};

export default function EditCarrefourLoyaltyId() {
  const location = useLocation();
  const scannedCardNumbers = location.state?.cardNumbers;
  const userLoyaltyCode = location?.state?.userLoyaltyCode || "913572";
  const userLoyaltyPassCode = location?.state?.userLoyaltyPassCode?.replace(
    /^103/gm,
    ""
  );
  const whichCardWasSet = userLoyaltyCode
    ? CARREFOUR_LOYALTY_CODE
    : CARREFOUR_PASS_LOYALTY_CODE;
  const whichCardWasScanned =
    scannedCardNumbers?.length <= 16
      ? CARREFOUR_PASS_LOYALTY_CODE
      : CARREFOUR_LOYALTY_CODE;
  const [card, setCard] = useState(
    scannedCardNumbers ? whichCardWasScanned : whichCardWasSet
  );
  const retailer = location?.state?.retailer;
  const [loyaltyCode, setLoyaltyCode] = React.useState(
    scannedCardNumbers?.length > 16 ? scannedCardNumbers : userLoyaltyCode
  );
  const [loyaltyPassCode, setLoyaltyPassCode] = React.useState(
    scannedCardNumbers?.length <= 16 ? scannedCardNumbers : userLoyaltyPassCode
  );
  const loyaltyCodesValidation = validateLoyaltyCodes(
    loyaltyCode,
    loyaltyPassCode
  );

  const [, updateMessage] = useMessageContext();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const submitApiCall = useApiCall();

  function cardChange(newCard) {
    if (
      newCard !== CARREFOUR_LOYALTY_CODE &&
      newCard !== CARREFOUR_PASS_LOYALTY_CODE
    )
      return;
    setCard(newCard);
  }

  function deleteId() {
    deleteApiCall(
      () =>
        http.delete("/api/retailer/loyalty_code", {
          data: {
            // id hardcoded because this component set carrefour id exclusively
            retailerId: CARREFOUR_ID,
            loyaltyCodeType: codeTypeToParamMap[card],
          },
        }),
      deleteSuccessCb
    );
  }

  const deleteApiCall = useApiCall();

  const deleteSuccessCb = () => {
    setLoyaltyCode("");
    updateMessage(
      {
        type: "success",
        text: formatMessage({
          id: "retailerIdEdit:DeleteSuccess",
          defaultMessage: "Successfully removed loyalty ID!",
        }),
        onClose: () => navigate(-1, { replace: true }),
      },
      10000
    );
  };

  function submitSuccessCb() {
    updateMessage(
      {
        type: "success",
        text: formatMessage({
          id: "retailerIdEdit:Success",
          defaultMessage: "Successfully added loyalty ID!",
        }),
      },
      10000
    );
    const state = { ...location.state };
    if (card === CARREFOUR_PASS_LOYALTY_CODE)
      state.userLoyaltyPassCode = `103${loyaltyCode}`;
    else state.userLoyaltyCode = loyaltyCode;
    navigate(location.pathname, {
      replace: true,
      state,
    });
  }

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

    submitApiCall(() => http.put("/api/user/retailer", data), submitSuccessCb);
  }

  const disabled = !loyaltyCodesValidation[card];

  const codeValue = location?.state[codeTypeToCodeVarMap[card]];

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
          onClick={onSubmit}
          disabled={disabled}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:Save"
            defaultMessage="Save"
          />
        </Button>
        {codeValue ? <DeleteButton onClick={deleteId} /> : null}
      </div>
    </Page>
  );
}
