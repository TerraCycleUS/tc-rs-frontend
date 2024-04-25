import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

import classes from "./CouponItems.module.scss";
import CouponHeader from "../CouponHeader";
import { getCategoryName, getRetailerIcon } from ".";
import UnlockedCouponDate from "../UnlockedCouponDate";
import MoreItemsText from "./MoreItemsText";
import ProgressBar from "./ProgressBar";
import CouponButton from "./CouponButton";
import useCategories from "../../utils/useCategories";

export default function CouponItem({
  coupon,
  unlockClickHandler,
  retailer,
  retailers,
  unlockedCoupon = false,
  scanClickHandler,
}) {
  const {
    id,
    discount,
    retailerId,
    startDate,
    endDate,
    status,
    name,
    requiredAmount,
    availableAmount = 0,
    categoryId,
    discountCurrency,
    brandLogo,
  } = coupon;
  const { categories } = useCategories();
  const navigate = useNavigate();

  const locked = requiredAmount > availableAmount;

  const clickHandler = (e) => {
    if (
      e.target.id === "scanBarcode" ||
      e.target.parentElement.id === "scanBarcode" ||
      e.target.id === "unlockCoupon" ||
      e.target.parentElement.id === "unlockCoupon"
    ) {
      return;
    }

    navigate(
      { pathname: "../landing", search: location.search },
      {
        state: {
          ...coupon,
          retailer,
          active: unlockedCoupon,
        },
        replace: true,
      }
    );
  };

  return (
    <div className={classes.coupon} key={id} onClick={clickHandler}>
      <div
        data-testid="landing-btn"
        className={classes.landingBtn}
        type="button"
      >
        <div
          className={classNames(
            classes.topPart,
            "d-flex justify-content-between"
          )}
        >
          <p className={classes.percent}>
            {discountCurrency === "%" ? "-" : ""}
            {discount}
            {discountCurrency}
          </p>
          <CouponHeader
            brandLogo={brandLogo}
            retailerLogo={getRetailerIcon(retailers, retailerId)}
          />
        </div>
        <div>
          <p className={classes.text}>{name}</p>
        </div>
      </div>
      <UnlockedCouponDate
        startDate={startDate}
        endDate={endDate}
        status={status}
      />
      <CouponButton
        locked={locked}
        scanClickHandler={scanClickHandler}
        unlockClickHandler={unlockClickHandler}
        unlockedCoupon={unlockedCoupon}
      />
      {!unlockedCoupon ? (
        <p className="my-text-description my-color-textPrimary">
          {locked ? (
            <MoreItemsText
              itemsCount={requiredAmount - (availableAmount || 0)}
              category={getCategoryName(categories, categoryId)?.toLowerCase()}
            />
          ) : (
            <FormattedMessage
              id="couponItems:UnlockDescription"
              defaultMessage="You can now unlock the coupon and redeem it."
            />
          )}
        </p>
      ) : null}
      {!unlockedCoupon ? (
        <ProgressBar
          availableItemsCount={availableAmount || 0}
          requiredItemsCount={requiredAmount || 0}
        />
      ) : null}
    </div>
  );
}

CouponItem.propTypes = {
  coupon: PropTypes.shape({
    id: PropTypes.number,
    discount: PropTypes.number,
    retailerId: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    status: PropTypes.string,
    name: PropTypes.string,
    requiredAmount: PropTypes.number,
    availableAmount: PropTypes.number,
    categoryId: PropTypes.number,
    discountCurrency: PropTypes.string,
    brandLogo: PropTypes.string,
  }),
  unlockClickHandler: PropTypes.func,
  retailer: PropTypes.number,
  retailers: PropTypes.array,
  unlockedCoupon: PropTypes.bool,
  scanClickHandler: PropTypes.func,
};
