import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import couponItemsClasses from "../CouponItems/CouponItems.module.scss";
import classes from "../../pages/CouponLanding/CouponLanding.module.scss";
import getProgressPercentage from "../../utils/getProgressPercentage";
import requiredItemsText from "../../utils/textChanging/requiredItemsText";

export default function CouponRequirement({ droppedAmount, requiredAmount }) {
  return (
    <div
      className={classNames(
        couponItemsClasses.numberItems,
        classes.amountIndicator
      )}
    >
      <div
        style={{
          width: getProgressPercentage(droppedAmount, requiredAmount),
        }}
        className={couponItemsClasses.progress}
      />
      <div className={couponItemsClasses.itemsText}>
        {requiredItemsText(requiredAmount)}
      </div>
    </div>
  );
}

CouponRequirement.propTypes = {
  droppedAmount: PropTypes.number,
  requiredAmount: PropTypes.number,
};
