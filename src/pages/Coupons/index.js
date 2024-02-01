import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import http from "../../utils/http";
import Page from "../../Layouts/Page";
import classes from "./Coupons.module.scss";
import CouponPanel from "../../components/CouponPanel";
import CouponItems from "../../components/CouponItems";
import ActiveCouponItems from "../../components/ActiveCouponItems";
import UnlockSuccessful from "../../components/PopUps/UnlockSuccessful";
import useApiCall from "../../utils/useApiCall";
import { detectLanguage } from "../../utils/intl";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [activeCoupons, setActiveCoupons] = useState([]);
  const [showActive, setShowActive] = useState(false);
  const user = useSelector((state) => state.user);
  const [droppedAmount, setDroppedAmount] = useState(0);
  const [showPop, setShowPop] = useState(false);
  const location = useLocation();
  const getCouponApiCall = useApiCall();
  const getAmountApiCall = useApiCall();
  const retailer = location?.state?.retailer;

  const [userRetailers, setUserRetailers] = useState([]);
  const getMyRetailersApiCall = useApiCall();

  const getCategoryApiCall = useApiCall();
  const currentLang = user?.lang || detectLanguage();
  const [categories, setCategories] = useState([]);

  const getRetailersApiCall = useApiCall();
  const [retailers, setRetailers] = useState([]);

  useEffect(() => {
    getRetailersApiCall(
      () => http.get(`/api/retailer/public-retailers?lang=${currentLang}`),
      (response) => {
        setRetailers(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  useEffect(() => {
    getCategoryApiCall(
      () => http.get(`/api/category/public?lang=${currentLang}`),
      (response) => {
        setCategories(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  useEffect(() => {
    getMyRetailersApiCall(
      () => http.get("/api/retailer/my-retailers"),
      (response) => {
        setUserRetailers(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  const userHasThisRetailer = userRetailers?.some(
    (userRetailer) => userRetailer.id === retailer
  );

  useEffect(() => {
    const fromLanding = location?.state;
    if (fromLanding) setShowActive(fromLanding?.active);
  }, []);

  function getCoupon() {
    if (user) {
      return Promise.all([
        http.get(`/api/coupon?retailerIds=${retailer}`),
        http.get(`/api/coupon/my-coupons?retailerIds=${retailer}`),
      ]);
    }

    return Promise.all([
      http.get(
        `/api/coupon/public-coupons?lang=${currentLang}?retailerIds=${retailer}`
      ),
      Promise.resolve({ data: [] }),
    ]);
  }

  const couponSuccessCb = ([res1, res2]) => {
    setCoupons(res1.data);
    setActiveCoupons(res2.data);
  };

  useEffect(() => {
    getCouponApiCall(() => getCoupon(), couponSuccessCb, null, null, {
      message: false,
    });
  }, []);

  useEffect(() => {
    if (!showPop) return;
    getAvailableAmount();
    getCouponApiCall(() => getCoupon(), couponSuccessCb, null, null, {
      message: false,
    });
  }, [showPop]);

  useEffect(() => {
    getAvailableAmount();
  }, []);

  function getAvailableAmount() {
    if (!user) return;

    getAmountApiCall(
      () => http.get("/api/user/profile"),
      (response) => {
        setDroppedAmount(response.data.availableAmount);
      },
      null,
      null,
      { message: false }
    );
  }

  function renderPop() {
    if (!showPop) return null;
    return (
      <UnlockSuccessful
        language={user?.lang}
        setShowPop={setShowPop}
        setShowActive={setShowActive}
      />
    );
  }

  function showCoupons() {
    if (showActive)
      return (
        <ActiveCouponItems
          activeCoupons={activeCoupons}
          retailer={retailer}
          userHasThisRetailer={userHasThisRetailer}
          categories={categories}
          retailers={retailers}
        />
      );
    return (
      <CouponItems
        coupons={coupons}
        setShowPop={setShowPop}
        setActiveCoupons={setActiveCoupons}
        retailer={retailer}
        userHasThisRetailer={userHasThisRetailer}
        categories={categories}
        retailers={retailers}
      />
    );
  }

  function showDroppedAmountText() {
    if (droppedAmount === 0)
      return (
        <FormattedMessage
          id="coupons:RecycledZero"
          defaultMessage="{droppedAmount} items recycled"
          values={{ droppedAmount }}
        />
      );
    if (droppedAmount === 1)
      return (
        <FormattedMessage
          id="coupons:RecycledSingular"
          defaultMessage="{droppedAmount} item recycled"
          values={{ droppedAmount }}
        />
      );
    return (
      <FormattedMessage
        id="coupons:Recycled"
        defaultMessage="{droppedAmount} items recycled"
        values={{ droppedAmount }}
      />
    );
  }

  return (
    <Page footer backgroundGrey className="with-animation">
      <div className={classes.couponsWrapper}>
        <h4
          className={classNames(
            classes.itemsRecycled,
            "my-text-h4 my-color-main"
          )}
        >
          {showDroppedAmountText()}
        </h4>
        <CouponPanel
          showActive={showActive}
          setShowActive={setShowActive}
          activeAmount={parseInt(activeCoupons?.length, 10)}
        />
        {showCoupons()}
      </div>
      {renderPop()}
    </Page>
  );
}
