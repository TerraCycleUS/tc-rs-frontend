import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "../CouponItems/CouponItems.module.scss";
import NoCoupons from "../NoCoupons";
import UnlockedCouponDate from "../UnlockedCouponDate";
import CouponHeader from "../CouponHeader";
import { getRetailerIcon } from "../CouponItems";
import Button from "../Button";
import { FormattedMessage } from "react-intl";

export default function ActiveCouponItems({
  activeCoupons,
  retailer,
  userHasThisRetailer,
  categories,
  retailers,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!activeCoupons?.length) return <NoCoupons />;
  return (
    <>
      {activeCoupons.map((coupon) => {
        const {
          id,
          discount,
          retailerId,
          startDate,
          endDate,
          status,
          name,
          discountCurrency,
        } = coupon;
        const clickHandler = (e) => {
          const showBarcode =
            e.target.id === "scanBarcode" ||
            e.target.parentElement.id === "scanBarcode";
          navigate(
            { pathname: "../landing", search: location.search },
            {
              state: {
                ...coupon,
                showBarcode,
                active: true,
                retailer,
                categories,
                userHasThisRetailer,
              },
              replace: true,
            }
          );
        };
        return (
          <div className={classes.coupon} key={id}>
            <div onClick={clickHandler} className={classes.landingBtn} key={id}>
              <div
                className={classNames(
                  classes.topPart,
                  "d-flex justify-content-between"
                )}
              >
                <p className={classes.percent}>
                  {discount}
                  {discountCurrency}
                </p>
                <CouponHeader
                  brandLogo={coupon.backgroundImage}
                  retailerLogo={getRetailerIcon(retailers, retailerId)}
                />
              </div>
              <div>
                <p className={classes.text}>{name}</p>
              </div>
              <UnlockedCouponDate
                startDate={startDate}
                endDate={endDate}
                status={status}
              />
              <Button id="scanBarcode">
                <FormattedMessage
                  id="couponLanding:ScanBarcode"
                  defaultMessage="Scan Barcode"
                />
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}

ActiveCouponItems.propTypes = {
  activeCoupons: PropTypes.array,
  retailer: PropTypes.number,
  userHasThisRetailer: PropTypes.bool,
  categories: PropTypes.array,
  retailers: PropTypes.array,
};
