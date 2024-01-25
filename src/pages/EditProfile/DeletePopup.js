import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

import classNames from "classnames";
import Button from "../../components/Button";
import Text, { H2 } from "../../components/Text";
import classes from "./EditProfile.module.scss";
import popClasses from "../../components/PopUps/GenericPop/GenericPop.module.scss";

export default function DeletePopup({ onContinue, onCancel }) {
  return (
    <div className={popClasses.popWrapper}>
      <div
        className={classNames(popClasses.popContainer, classes.deleteContainer)}
      >
        <H2 className={classes.title}>
          <FormattedMessage
            id="profileEdit:DeletePopupTitle"
            defaultMessage="Warning!"
          />
        </H2>
        <Text
          className={classNames(
            classes.description,
            "my-color-textPrimary text-center"
          )}
        >
          <FormattedMessage
            id="profileEdit:DeletePopupDescription1"
            defaultMessage="Are you sure you want to delete your account?"
          />
        </Text>
        <Text
          className={classNames(
            classes.description,
            "my-color-textPrimary text-center"
          )}
        >
          <strong>
            <FormattedMessage
              id="profileEdit:DeletePopupDescription2"
              defaultMessage="All your scanned items, unlocked coupons and profile information will be permanently deleted."
            />
          </strong>
        </Text>
        <Button onClick={onContinue}>
          <FormattedMessage
            id="profileEdit:DeletePopupSubmitButton"
            defaultMessage="Delete"
          />
        </Button>
        <Button inverted onClick={onCancel} className={classes.cancelBtn}>
          <FormattedMessage
            id="profileEdit:DeletePopupCancelButton"
            defaultMessage="Cancel"
          />
        </Button>
      </div>
    </div>
  );
}

DeletePopup.propTypes = {
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
};
