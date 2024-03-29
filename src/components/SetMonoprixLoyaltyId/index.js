import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import classNames from "classnames";
import Button from "../Button";
import Page from "../../Layouts/Page";
import http from "../../utils/http";
import CreateNow from "../PopUps/CreateNow";
import OtpInput from "../OtpInput";
import { useMessageContext } from "../../context/message";
import useApiCall from "../../utils/useApiCall";
import validateRetailersId from "../../utils/validateRetailersId";
import Checkbox from "../Checkbox";
import classes from "./SetMonoprixLoyaltyId.module.scss";
import MonoprixCard from "../PopUps/MonoprixCard";

export default function SetMonoprixLoyaltyId() {
  const [{ code, isNum }, setCode] = React.useState({ code: "", isNum: true });
  const [, updateMessage] = useMessageContext();
  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [permission, setPermission] = useState(false);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const apiCall = useApiCall();
  const location = useLocation();
  const { fromRewards, redirect } = queryString.parse(location.search);
  const retailer = location?.state?.retailer;

  const successCb = () => {
    updateMessage(
      {
        type: "success",
        text: formatMessage({
          id: "retailersId:Success",
          defaultMessage: "Successful Monoprix identification!",
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
          id: "retailersId:Error",
          defaultMessage: "Unsucessful Monoprix identification!",
        }),
      },
      10000
    );
  };

  function getLink() {
    if (fromRewards) return "/rewards";
    return "/";
  }

  function openPop() {
    setShow(true);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      retailerId: retailer,
      userLoyaltyCode: code,
    };

    apiCall(
      () =>
        http
          .post("/api/retailer/assign", { retailerId: retailer })
          .then(() => http.put("/api/user/retailer", data)),
      successCb,
      errorCb
    );
  };

  return (
    <Page>
      <div className={classes.wrapper}>
        <p
          className={classNames(
            classes.description,
            "text-md-center",
            "my-text",
            "my-color-textPrimary"
          )}
        >
          <FormattedMessage
            id="retailersId:Description"
            defaultMessage="Registration was successful. Please enter the Monoprix ID as shown on the card {learnMore}"
            values={{
              learnMore: (
                <button
                  type="button"
                  aria-label="learn more"
                  className={classes.learnMoreBtn}
                  onClick={() => setShowCard(true)}
                />
              ),
            }}
          />
        </p>
        <form onSubmit={submitHandler}>
          <label className="my-text-label my-color-main" htmlFor="opt-code">
            <FormattedMessage
              id="retailersId:InputLabel"
              defaultMessage="Monoprix ID"
            />
          </label>
          <div
            className={classNames(
              classes.codeInput,
              "d-flex",
              "align-items-center",
              "justify-content-center",
              "justify-content-md-start"
            )}
          >
            <OtpInput
              value={code}
              validate={(char, i) => {
                const newValue = code.split("");
                const deleteCount = newValue[i] !== undefined ? 1 : 0;
                newValue.splice(i, deleteCount, char);
                return validateRetailersId(newValue);
              }}
              onChange={(value) => {
                setCode({ code: value, isNum: !/^\d{6}/.test(value) });
              }}
              numInputs={17}
              placeholder={"_".repeat(17)}
              containerStyle={classNames(
                classes.inputWrapper,
                "d-flex",
                "w-auto",
                "my-bg-color-secondary"
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
              id="retailersId:SubmitButton"
              defaultMessage="Save"
            />
          </Button>
        </form>
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
                id="retailersId:DescriptionBottom"
                defaultMessage="I accept that Terracycle shares my Monoprix ID so that Monoprix delivers the coupons on my Monoprix loyalty account."
              />
            </p>
          </Checkbox>
        </div>
        <p
          className={classNames(
            classes.noId,
            "text-center",
            "my-text",
            "my-color-textPrimary"
          )}
        >
          <FormattedMessage
            id="retailersId:NoId"
            defaultMessage="Do not have a retailer’s ID?"
          />
        </p>
        <Button onClick={openPop} inverted>
          <FormattedMessage id="retailersId:Create" defaultMessage="Setup ID" />
        </Button>
        <div className={classes.linkRow}>
          <p className="my-text-primary my-color-main">
            <Link to={getLink()}>
              <FormattedMessage
                id="retailersId:Skip"
                defaultMessage="Skip for now"
              />
            </Link>
          </p>
        </div>
        {show ? <CreateNow setShow={setShow} /> : null}
      </div>
      {showCard ? <MonoprixCard closePop={() => setShowCard(false)} /> : null}
    </Page>
  );
}
