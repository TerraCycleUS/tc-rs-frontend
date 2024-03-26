import React from "react";
import classNames from "classnames";
import propTypes from "prop-types";
import classes from "./CouponHeader.module.scss";

export default function CouponHeader({ brandLogo, retailerLogo }) {
  return (
    <div
      className={classNames(
        classes.logos,
        "d-flex align-items-center justify-content-end"
      )}
    >
      <img alt="brand" src={brandLogo} className={classes.brandLogo} />
      <span className={classes.divider}></span>
      <img alt="retailer" src={retailerLogo} className={classes.brandLogo} />
    </div>
  );
}

CouponHeader.propTypes = {
  brandLogo: propTypes.string,
  retailerLogo: propTypes.string,
};
