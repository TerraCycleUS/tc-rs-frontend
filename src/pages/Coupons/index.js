import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import queryString from "query-string";
import http from "../../utils/http";
import Page from "../../Layouts/Page";
import classes from "./Coupons.module.scss";
import CouponPanel from "../../components/CouponPanel";
import CouponItems from "../../components/CouponItems";
import ActiveCouponItems from "../../components/ActiveCouponItems";
import UnlockSuccessful from "../../components/PopUps/UnlockSuccessful";
import useApiCall from "../../utils/useApiCall";
import { detectLanguage } from "../../utils/intl";
import SortingPanel from "../../components/SortingPanel";
import { calculateCouponWeight, sortCouponsByWeight } from "./couponsUtils";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [activeCoupons, setActiveCoupons] = useState([]);
  const [showActive, setShowActive] = useState(false);
  const user = useSelector((state) => state.user);
  const [showPop, setShowPop] = useState(false);
  const location = useLocation();
  const getCouponApiCall = useApiCall();
  const params = queryString.parse(location.search);

  const [userRetailers, setUserRetailers] = useState([]);
  const getMyRetailersApiCall = useApiCall();

  const currentLang = user?.lang || detectLanguage();
  const [activeRetailer, setActiveRetailer] = useState(
    location?.state?.retailer || params.retailer || "All"
  );
  const getRetailersApiCall = useApiCall();
  const [retailers, setRetailers] = useState([]);
  const retailer = activeRetailer === "All" ? undefined : activeRetailer;

  useEffect(() => {
    getRetailersApiCall(
      () => http.get("/api/retailer/public-retailers"),
      (response) => {
        setRetailers(response.data);
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
        http.get(`/api/coupon`, { params: { retailerIds: retailer } }),
        http.get(`/api/coupon/my-coupons`, {
          params: { retailerIds: retailer },
        }),
      ]);
    }

    return Promise.all([
      http.get(`/api/coupon/public-coupons`, {
        params: { lang: currentLang, retailerIds: retailer },
      }),
      Promise.resolve({ data: [] }),
    ]);
  }

  const couponSuccessCb = ([res1, res2]) => {
    const res1WeightedData = res1.data.map((item) => {
      item.weight = calculateCouponWeight(item);
      return item;
    });

    const res2WeightedData = res2.data.map((item) => {
      item.weight = calculateCouponWeight(item);
      return item;
    });
    setCoupons(sortCouponsByWeight(res1WeightedData));
    setActiveCoupons(sortCouponsByWeight(res2WeightedData));
  };

  useEffect(() => {
    getCouponApiCall(() => getCoupon(), couponSuccessCb, null, null, {
      message: false,
    });
  }, [retailer]);

  useEffect(() => {
    if (!showPop) return;
    getCouponApiCall(() => getCoupon(), couponSuccessCb, null, null, {
      message: false,
    });
  }, [showPop, retailer]);

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
        retailers={retailers}
      />
    );
  }

  return (
    <Page footer backgroundGrey className="with-animation">
      <div className={classes.couponsWrapper}>
        <SortingPanel
          types={retailers.map((item) => ({ ...item, title: item.name }))}
          currentType={activeRetailer}
          setCurrentType={setActiveRetailer}
          className={classes.sortingPanel}
        />
        <CouponPanel
          showActive={showActive}
          setShowActive={setShowActive}
          activeAmount={parseInt(activeCoupons?.length, 10) || 0}
        />
        {showCoupons()}
      </div>
      {renderPop()}
    </Page>
  );
}
