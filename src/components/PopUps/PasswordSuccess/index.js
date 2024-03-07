import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { PopContainer, PopWrapper } from "../GenericPop";
import Button from "../../Button";
import classes from "./PasswordSuccess.module.scss";
import imageUrl from "../../../assets/images/drop-them-off.svg";

export default function PasswordSuccess({ next }) {
  return (
    <PopWrapper className={classes.wrapper}>
      <PopContainer className={classes.container}>
        <h3
          className={classNames(
            classes.heading,
            "my-color-textBlack my-text-h2"
          )}
        >
          <FormattedMessage
            id="passwordSuccess:Title"
            defaultMessage="Successful password setup"
          />
        </h3>
        <img
          src={imageUrl}
          alt="successful password setup"
          className="d-block"
        />
        <p className="my-text my-color-textPrimary text-center">
          <FormattedMessage
            id="passwordSuccess:Desc1"
            defaultMessage="Thank you! You can now choose retailers and drop off your items to be recycled "
          />
        </p>
        <Button className={classes.next} onClick={next}>
          <FormattedMessage
            id="passwordSuccess:Next"
            defaultMessage="Select retailer"
          />
        </Button>
      </PopContainer>
    </PopWrapper>
  );
}

PasswordSuccess.propTypes = {
  next: PropTypes.func,
};
