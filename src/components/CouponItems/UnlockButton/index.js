import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import { ReactComponent as UnlockIcon } from "../../../assets/icons/unlock.svg";
import { ReactComponent as LockIcon } from "../../../assets/icons/lock.svg";
import classes from "./UnlockButton.module.scss";
import classNames from "classnames";

const UnlockButton = ({ onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(classes.unlockBtn, className)}
      disabled={disabled}
    >
      {disabled ? (
        <LockIcon className={classes.lockIcon} />
      ) : (
        <UnlockIcon className={classes.lockIcon} />
      )}
      <p className={classes.unlockText}>
        <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
      </p>
    </button>
  );
};

UnlockButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default UnlockButton;
