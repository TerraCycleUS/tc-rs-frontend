import React from "react";
import { FormattedMessage } from "react-intl";
import classes from "./CouponLanding.module.scss";

export default function MonoprixTerms() {
  return (
    <ul className={classes.termsSummary}>
      <li>
        <FormattedMessage
          id="couponLanding:WhereToUseMnp"
          defaultMessage="This coupon can be used in any Monoprix store (except monop’) in France."
        />
      </li>
      <li>
        <FormattedMessage
          id="couponLanding:PresentCouponMnp"
          defaultMessage="One coupon redeemable per item purchased. Coupons cannot be combined"
        />
      </li>
      <li>
        <FormattedMessage
          id="couponLanding:ScannedOnceMnp"
          defaultMessage="This coupon can be scanned only once at checkout."
        />
      </li>
      <li>
        <FormattedMessage
          id="couponLanding:ValidMnp"
          defaultMessage="Coupons are only valid 30 days after the date of unlocking."
        />
      </li>
      <li>
        <FormattedMessage
          id="couponLanding:MinimumAmountMnp"
          defaultMessage="No minimum purchase amount to use the coupons."
        />
      </li>
    </ul>
  );
}
