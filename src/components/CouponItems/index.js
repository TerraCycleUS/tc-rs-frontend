import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from "query-string";

import { ReactComponent as UnlockIcon } from "../../assets/icons/unlock.svg";
import classes from "./CouponItems.module.scss";
import NoCoupons from "../NoCoupons";
import useApiCall from "../../utils/useApiCall";
import { unlockCoupon } from "../CouponUnlocking";
import CouponHeader from "../CouponHeader";
import UnlockedCouponDate from "../UnlockedCouponDate";
import MoreItemsText from "./MoreItemsText";
import ProgressBar from "./ProgressBar";
import Button from "../Button";
import { FormattedMessage } from "react-intl";

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
          discountCurrency,
        } = coupon;
        const unlockClickHandler = () => {
          if (user) {
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
            return;
          }

          navigate({
            pathname: "/sign-in",
            search: queryString.stringify({
              redirect: `${location.pathname}${location.search}`,
            }),
          });
        };
        const locked = requiredAmount > availableAmount;
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
                <p className={classes.percent}>
                  {discount}
                  {discountCurrency}
                </p>
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
            />
            {!locked ? (
              <Button
                onClick={unlockClickHandler}
                customContent
                className={classNames(
                  classes.unlockButton,
                  "d-flex align-items-center justify-content-center fw-bold"
                )}
              >
                <UnlockIcon className={classes.lockIcon} />
                <p className={classes.unlockText}>
                  <FormattedMessage
                    id="couponItems:Unlock"
                    defaultMessage="Unlock"
                  />
                </p>
              </Button>
            ) : null}
            <p className="my-text-description my-color-textPrimary">
              {locked ? (
                <MoreItemsText
                  itemsCount={requiredAmount - (availableAmount || 0)}
                  category={getCategoryName(
                    categories,
                    categoryId
                  )?.toLowerCase()}
                />
              ) : (
                <FormattedMessage
                  id="couponItems:UnlockDescription"
                  defaultMessage="You can now unlock the coupon and redeem it."
                />
              )}
            </p>
            <ProgressBar
              availableItemsCount={availableAmount || 0}
              requiredItemsCount={requiredAmount || 0}
            />
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
