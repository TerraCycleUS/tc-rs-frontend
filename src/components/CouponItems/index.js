import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./CouponItems.module.scss";
import NoCoupons from "../NoCoupons";
import useApiCall from "../../utils/useApiCall";
import { unlockCoupon } from "../CouponUnlocking";
import CouponHeader from "../CouponHeader";
import UnlockedCouponDate from "../UnlockedCouponDate";
import UnlockButton from "./UnlockButton";
import MoreItemsText from "./MoreItemsText";

export default function CouponItems({
  coupons,
  setActiveCoupons,
  setShowPop,
  retailer,
  userHasThisRetailer,
  categories,
  retailers,
}) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  };
  const apiCall = useApiCall();

  const successCb = (response) => {
    setActiveCoupons(response.data);
  };

  // function getProgressPercentage(requiredAmount, availableAmount) {
  //   const progress = (availableAmount / requiredAmount) * 100;
  //   if (progress > 100) return "100%";
  //   return `${progress}%`;
  // }

  if (!coupons?.length) return <NoCoupons />;
  return (
    <>
      {coupons.map((coupon) => {
        const {
          id,
          discount,
          retailerId,
          startDate,
          endDate,
          status,
          name,
          requiredAmount,
          availableAmount,
          categoryId,
        } = coupon;
        const unlockClickHandler = () =>
          unlockCoupon({
            id,
            config,
            setShowPop,
            apiCall,
            successCb,
            userHasThisRetailer,
            retailer,
            navigate,
          });

        return (
          <div className={classes.coupon} key={id}>
            <button
              data-testid="landing-btn"
              className={classes.landingBtn}
              type="button"
              onClick={() => {
                navigate(
                  { pathname: "../landing", search: location.search },
                  {
                    state: {
                      ...coupon,
                      retailer,
                      categories,
                      active: false,
                    },
                    replace: true,
                  }
                );
              }}
            >
              <div
                className={classNames(
                  classes.topPart,
                  "d-flex justify-content-between"
                )}
              >
                <p className={classes.percent}>{discount}&euro;</p>
                <CouponHeader
                  backgroundImage={coupon.backgroundImage}
                  brandLogo={getRetailerIcon(retailers, retailerId)}
                />
              </div>
              <div>
                <p className={classes.text}>{name}</p>
              </div>
            </button>
            <UnlockedCouponDate
              startDate={startDate}
              endDate={endDate}
              status={status}
              expirationDate={endDate}
            />
            <UnlockButton
              onClick={unlockClickHandler}
              disabled={requiredAmount > availableAmount}
              className={classes.unlockButton}
            />
            <p className={classes.moreItemsText}>
              <MoreItemsText
                itemsCount={requiredAmount - (availableAmount || 0)}
                category={getCategoryName(categories, categoryId).toLowerCase()}
              />
            </p>
          </div>
        );
      })}
    </>
  );
}

CouponItems.propTypes = {
  coupons: PropTypes.array,
  setActiveCoupons: PropTypes.func,
  setShowPop: PropTypes.func,
  retailer: PropTypes.number,
  userHasThisRetailer: PropTypes.bool,
  categories: PropTypes.array,
  retailers: PropTypes.array,
};

export function getCategoryName(categories, categoryId) {
  return categories?.find((category) => category.id === categoryId)?.title;
}

export function getRetailerIcon(retailers, retailerId) {
  return retailers?.find((retailer) => retailer.id === retailerId)?.logo;
}
