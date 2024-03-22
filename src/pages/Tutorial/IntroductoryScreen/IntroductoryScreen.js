import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import introductoryImage from "../../../assets/images/introductory.jpg";
import classes from "./IntroductoryScreen.module.scss";
import Button from "../../../components/Button";

export default function IntroductoryScreen({ onContinueClick }) {
  return (
    <div className={classes.wrapper}>
      <h1>
        <FormattedMessage
          id="IntroductoryScreen:Title"
          defaultMessage="Recycle and save!"
        />
      </h1>
      <p>
        <FormattedMessage
          id="IntroductoryScreen:Description"
          defaultMessage="Earn coupons on your groceries by recycling in store"
        />
      </p>
      <img src={introductoryImage} alt="introductory" />
      <Button onClick={onContinueClick}>
        <FormattedMessage
          id="IntroductoryScreen:Continue"
          defaultMessage="Continue"
        />
      </Button>
    </div>
  );
}

IntroductoryScreen.propTypes = {
  onContinueClick: PropTypes.func,
};
