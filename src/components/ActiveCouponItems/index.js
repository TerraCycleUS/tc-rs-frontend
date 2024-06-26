import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import NoCoupons from "../NoCoupons";
import CouponItem from "../CouponItems/CouponItem";

export default function ActiveCouponItems({
  activeCoupons,
  retailer,
  userHasThisRetailer,
  retailers,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!activeCoupons?.length) return <NoCoupons />;
  return (
    <>
      {activeCoupons.map((coupon) => {
        const clickHandler = () => {
          navigate(
            { pathname: "../landing", search: location.search },
            {
              state: {
                ...coupon,
                showBarcode: true,
                active: true,
                retailer,
                userHasThisRetailer,
              },
              replace: true,
            }
          );
        };
        return (
          <CouponItem
            coupon={coupon}
            key={coupon.id}
            retailer={retailer}
            retailers={retailers}
            unlockedCoupon
            scanClickHandler={clickHandler}
          />
        );
      })}
    </>
  );
}

ActiveCouponItems.propTypes = {
  activeCoupons: PropTypes.array,
  retailer: PropTypes.number,
  userHasThisRetailer: PropTypes.bool,
  retailers: PropTypes.array,
};
