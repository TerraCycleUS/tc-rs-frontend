import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import introductoryImage from "../../assets/images/introductory.jpg";
import classes from "./IntroductoryScreen.module.scss";
import Button from "../../components/Button";
import Page from "../../Layouts/Page";
import StyledRecycleSave from "../../components/Icons/StyledRecycleSave";

export default function IntroductoryScreen() {
  const navigate = useNavigate();

  return (
    <Page>
      <StyledRecycleSave className={classes.icon} />
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
        <Button
          onClick={() => navigate("/profile/tutorial")}
          className={classes.continueBtn}
        >
          <FormattedMessage
            id="IntroductoryScreen:Continue"
            defaultMessage="Continue"
          />
        </Button>
      </div>
    </Page>
  );
}

IntroductoryScreen.propTypes = {
  onContinueClick: PropTypes.func,
};
