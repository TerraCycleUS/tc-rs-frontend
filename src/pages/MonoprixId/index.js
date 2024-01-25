import React from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import PropTypes from "prop-types";

import Button from "../../components/Button";
import OtpInput from "../../components/OtpInput";
import classes from "./Monoprixid.module.scss";
import validateRetailersId from "../../utils/validateRetailersId";

const MONOPRIX_CODE_LENGTH = 17;

export default function MonoprixId({ submitHandler, code, isNum, setCode }) {
  function onSubmit(e) {
    e.preventDefault();
    return submitHandler(code);
  }

  return (
    <form onSubmit={onSubmit} className={classes.wrapper}>
      <label className="my-text-label my-color-main" htmlFor="opt-code">
        <FormattedMessage
          id="monoprixId:InputLabel"
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
          data-testid="otp-input"
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
          numInputs={MONOPRIX_CODE_LENGTH}
          placeholder={"_".repeat(MONOPRIX_CODE_LENGTH)}
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
            <span className="text-center flex-grow-1 flex-md-grow-0">-</span>
          }
        />
      </div>
      <Button
        data-testid="submit-btn"
        disabled={code.length < MONOPRIX_CODE_LENGTH}
        onClick={submitHandler}
        type="submit"
      >
        <FormattedMessage id="monoprixId:SubmitButton" defaultMessage="Save" />
      </Button>
    </form>
  );
}

MonoprixId.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  isNum: PropTypes.bool.isRequired,
  setCode: PropTypes.func.isRequired,
};
