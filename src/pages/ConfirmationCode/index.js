import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import classNames from "classnames";
import Button from "../../components/Button";
import Page from "../../Layouts/Page";
import Text, { TextPrimary } from "../../components/Text";
import http from "../../utils/http";
import OtpInput from "../../components/OtpInput";
import { setUser } from "../../actions/user";
import { useMessageContext } from "../../context/message";
import useApiCall from "../../utils/useApiCall";
import { detectLanguage } from "../../utils/intl";
import PasswordSuccess from "../../components/PopUps/PasswordSuccess";
import classes from "./ConfirmationCode.module.scss";

export default function ConfirmationCode() {
  const [activationCode, setCode] = React.useState("");
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [, updateMessage] = useMessageContext();
  const location = useLocation();
  const regData = location.state || queryString.parse(location.search) || {};
  const dispatch = useDispatch();
  const [codeResend, setCodeResend] = React.useState(false);
  const { email, socialProvider } = regData;
  const apiCall = useApiCall();
  const resendApiCall = useApiCall();

  function onClose() {
    navigate("../select-retailer?sign_up=true");
  }

  function successCb(res) {
    dispatch(setUser({ ...res.data, socialProvider }));
    setShow(true);
  }

  function errorCb() {
    updateMessage(
      {
        type: "error",
        text: formatMessage({
          id: "confirmCode:Error",
          defaultMessage: "Unsuccessful password setup!",
        }),
      },
      5000
    );
  }

  function resendCode() {
    setCodeResend(true);

    resendApiCall(() =>
      http.post("/api/user/resendVerificationCode", { email })
    );
  }

  function submit() {
    const data = {
      activationCode,
      email,
      lang: detectLanguage(),
    };

    apiCall(
      () => http.post("/api/user/confirmationEmail", data),
      successCb,
      errorCb
    );
  }

  return (
    <Page>
      <div className={classes.wrapper}>
        <Text className={classNames(classes.description, "text-md-center")}>
          <FormattedMessage
            id="confirmCode:Description"
            defaultMessage="Please enter the 4 digits code we’ve just sent to your email"
          />
        </Text>
        <OtpInput
          value={activationCode}
          onChange={setCode}
          numInputs={4}
          containerStyle={classes.codeInputContainer}
          inputStyle={classes.codeInput}
          isInputNum
        />
        <Button disabled={activationCode.length < 4} onClick={submit}>
          <FormattedMessage
            id="confirmCode:SubmitButton"
            defaultMessage="Next"
          />
        </Button>
        <div className={classes.linkRow}>
          <button
            className={classes.textBtn}
            type="button"
            onClick={resendCode}
            disabled={codeResend}
          >
            <TextPrimary>
              <FormattedMessage
                id="confirmCode:ResendCode"
                defaultMessage="Resend confirmation code"
              />
            </TextPrimary>
          </button>
        </div>
        {show ? <PasswordSuccess next={onClose} /> : null}
      </div>
    </Page>
  );
}
