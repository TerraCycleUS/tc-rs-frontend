import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from "query-string";

import NoCoupons from "../NoCoupons";
import useApiCall from "../../utils/useApiCall";
import { unlockCoupon } from "../CouponUnlocking";
import CouponItem from "./CouponItem";

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
        const { id } = coupon;
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

        return (
          <CouponItem
            coupon={coupon}
            categories={categories}
            key={id}
            retailer={retailer}
            retailers={retailers}
            unlockClickHandler={unlockClickHandler}
          />
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
  return retailers?.find((retailer) => retailer.id === retailerId)?.smallLogo;
}
