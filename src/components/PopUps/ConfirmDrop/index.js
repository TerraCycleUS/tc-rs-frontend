import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { PopContainer, PopWrapper } from "../GenericPop";
import { ReactComponent as Xmark } from "../../../assets/icons/x-mark.svg";
import Button from "../../Button";
import classes from "./ConfirmDrop.module.scss";

export default function ConfirmDrop({ onClick, onClose, storeName, location }) {
  return (
    <PopWrapper className={classes.wrapper}>
      <PopContainer className={classes.container}>
        <Xmark onClick={onClose} className="close-btn" />
        <h3
          className={classNames(
            classes.heading,
            "my-color-textBlack my-text-h2"
          )}
        >
          <FormattedMessage
            id="confirmDrop:Title"
            defaultMessage="Confirmation"
          />
        </h3>
        <p className="my-text my-color-textPrimary text-center">
          <FormattedMessage
            id="confirmDrop:Desc1"
            defaultMessage="I confirm that I have placed this item in the dedicated recycling kiosk at {storeName}, {location}"
            values={{
              storeName,
              location,
            }}
          />
        </p>
        <Button className={classes.next} onClick={onClick}>
          <FormattedMessage
            id="confirmDrop:Confirm"
            defaultMessage="Yes, I confirm"
          />
        </Button>
      </PopContainer>
    </PopWrapper>
  );
}

ConfirmDrop.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  storeName: PropTypes.string,
  location: PropTypes.string,
};
