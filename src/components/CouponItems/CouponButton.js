import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

import classes from "./CouponItems.module.scss";
import Button from "../Button";
import { ReactComponent as UnlockIcon } from "../../assets/icons/unlock.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";

export default function CouponButton({
  unlockedCoupon,
  scanClickHandler,
  unlockClickHandler,
  locked,
}) {
  if (unlockedCoupon) {
    return (
      <Button id="scanBarcode" onClick={scanClickHandler}>
        <FormattedMessage
          id="couponLanding:ScanBarcode"
          defaultMessage="Scan Barcode"
        />
      </Button>
    );
  }
  return (
    <Button
      id="unlockCoupon"
      onClick={unlockClickHandler}
      disabled={locked}
      customContent
      className={classNames(
        classes.unlockButton,
        "d-flex align-items-center justify-content-center fw-bold"
      )}
    >
      {locked ? (
        <LockIcon className={classes.lockIcon} />
      ) : (
        <UnlockIcon className={classes.lockIcon} />
      )}
      <p className={classes.unlockText}>
        <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
      </p>
    </Button>
  );
}

CouponButton.propTypes = {
  unlockedCoupon: PropTypes.bool,
  scanClickHandler: PropTypes.func,
  unlockClickHandler: PropTypes.func,
  locked: PropTypes.bool,
};
