import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import React, { useState } from "react";
import classes from "../../pages/CouponLanding/CouponLanding.module.scss";
import getMobileOperatingSystem from "../../utils/getMobileOperatingSystem";

export default function CouponUsing() {
  const [downloadLink] = useState(getMobileOperatingSystem());

  return (
    <p className={classNames(classes.linkText, "my-text-description")}>
      <FormattedMessage
        id="couponLanding:ToUse"
        defaultMessage="To use this coupon, please go to "
      />
      <a
        href={downloadLink}
        className={classes.appLink}
        target="_blank"
        rel="noreferrer"
      >
        <FormattedMessage
          id="couponLanding:App"
          defaultMessage="Monoprix app"
        />
      </a>
    </p>
  );
}
