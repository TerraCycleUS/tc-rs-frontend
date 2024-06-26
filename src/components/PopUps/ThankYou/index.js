import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PopContainer, PopWrapper } from "../GenericPop";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import { ReactComponent as HappyPlanet } from "../../../assets/icons/happy-planet.svg";
import Button from "../../Button";
import classes from "./ThankYou.module.scss";
import http from "../../../utils/http";
import useApiCall from "../../../utils/useApiCall";

export default function ThankYou({ amount, setShowPop }) {
  const [availableAmount, setAvailableAmount] = useState(0);
  const { formatMessage } = useIntl();

  const successCb = ({ data }) => {
    const total = data.countProductsByRetailer.reduce(
      (sum, { totalAmount }) => sum + totalAmount,
      0
    );
    setAvailableAmount(total);
  };

  const apiCall = useApiCall();

  useEffect(() => {
    apiCall(() => http.get("/api/user/profile"), successCb);
  }, []);

  function renderAmount() {
    const amountItems =
      amount > 1
        ? formatMessage({ id: "thankYou:Items", defaultMessage: "items" })
        : formatMessage({ id: "thankYou:Item", defaultMessage: "item" });
    const totalItems =
      availableAmount > 1
        ? formatMessage({ id: "thankYou:Items", defaultMessage: "items" })
        : formatMessage({ id: "thankYou:Item", defaultMessage: "item" });
    return (
      <FormattedMessage
        id="thankYou:YouRecycled"
        defaultMessage="You have recycled {amount} {amountItems} today, and have now recycled {availableAmount} {totalItems} in total."
        values={{ amount, availableAmount, amountItems, totalItems }}
      />
    );
  }

  return (
    <PopWrapper>
      <PopContainer>
        <Xmark onClick={() => setShowPop(false)} className="close-btn" />
        <h2 className={classes.heading}>
          <FormattedMessage
            id="thankYou:ThankYou"
            defaultMessage="Thank you!"
          />
        </h2>
        <HappyPlanet />
        <p className={classNames("text-center my-text", classes.amount)}>
          {renderAmount()}
        </p>
        <Link className={classes.button} to="/rewards-wallet/rewards">
          <Button>
            <FormattedMessage
              id="thankYou:Coupons"
              defaultMessage="See my coupons"
            />
          </Button>
        </Link>

        <Link className={classes.continueRecycling} to="/recycling-bin">
          <FormattedMessage
            id="thankYou:ContinueRecycling"
            defaultMessage="Continue Recycling"
          />
        </Link>
      </PopContainer>
    </PopWrapper>
  );
}
ThankYou.propTypes = {
  amount: PropTypes.number,
  setShowPop: PropTypes.func,
};
