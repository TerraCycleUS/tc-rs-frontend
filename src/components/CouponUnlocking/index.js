import { FormattedMessage } from "react-intl";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import classes from "../CouponItems/CouponItems.module.scss";
import landingClasses from "../../pages/CouponLanding/CouponLanding.module.scss";
import { ReactComponent as Lock } from "../../assets/icons/unlock.svg";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import needMoreItemsText from "../../utils/textChanging/needMoreItemsText";

export default function RenderUnlocking({
  requiredAmount,
  id,
  availableAmount,
  setShowPop,
  forLanding,
  userHasThisRetailer,
  retailer,
  category,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  };

  if (requiredAmount <= availableAmount)
    return (
      <CanBeUnlocked
        id={id}
        navigate={navigate}
        user={user}
        config={config}
        setShowPop={setShowPop}
        forLanding={forLanding}
        userHasThisRetailer={userHasThisRetailer}
        retailer={retailer}
      />
    );
  return (
    <CannotBeUnlocked
      availableAmount={availableAmount}
      requiredAmount={requiredAmount}
      forLanding={forLanding}
      category={category}
    />
  );
}

RenderUnlocking.propTypes = {
  requiredAmount: PropTypes.number,
  id: PropTypes.number,
  availableAmount: PropTypes.number,
  setShowPop: PropTypes.func,
  forLanding: PropTypes.bool,
  userHasThisRetailer: PropTypes.bool,
  retailer: PropTypes.number,
  category: PropTypes.string,
};

export function unlockCoupon({ id, config, setShowPop, apiCall, successCb }) {
  // User should be able to use app even retailer does not setuped;
  // if (!userHasThisRetailer) {
  //   navigate('/registration/retailers-id', { state: { retailer } })
  //   return
  // }

  apiCall(
    () => http.post("/api/coupon/activate", { id }, config),
    () => {
      setShowPop(true);
    },
    successCb
  );
}

export function CanBeUnlocked({
  id,
  navigate,
  user,
  config,
  setShowPop,
  forLanding,
  userHasThisRetailer,
  retailer,
}) {
  function classForLanding() {
    if (!forLanding) return "";
    return classes.forLanding;
  }
  const apiCall = useApiCall();
  return (
    <button
      onClick={() =>
        unlockCoupon({
          id,
          navigate,
          user,
          config,
          setShowPop,
          apiCall,
          userHasThisRetailer,
          retailer,
        })
      }
      type="button"
      className={classNames(classes.unlockBtn, classForLanding())}
    >
      <Lock className={classes.lockIcon} />
      <p className={classes.unlockText}>
        <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
      </p>
    </button>
  );
}

CanBeUnlocked.propTypes = {
  id: PropTypes.number,
  navigate: PropTypes.func,
  user: PropTypes.object,
  config: PropTypes.object,
  setShowPop: PropTypes.func,
  forLanding: PropTypes.bool,
  userHasThisRetailer: PropTypes.bool,
  retailer: PropTypes.number,
};

export function CannotBeUnlocked({
  availableAmount,
  requiredAmount,
  forLanding,
  category,
}) {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [difference, setDifference] = useState(0);

  function classForLanding() {
    if (!forLanding) return "";
    return landingClasses.needMore;
  }

  function countDifference() {
    if (availableAmount) setCurrentAmount(availableAmount);
    setDifference(requiredAmount - currentAmount);
  }

  useEffect(() => {
    countDifference();
  }, [availableAmount, requiredAmount, currentAmount]);

  return (
    <div className={classNames("d-flex flex-column", classForLanding())}>
      <p className={classes.moreItems}>
        {needMoreItemsText(difference, category)}
      </p>
    </div>
  );
}

CannotBeUnlocked.propTypes = {
  availableAmount: PropTypes.number,
  requiredAmount: PropTypes.number,
  forLanding: PropTypes.bool,
  category: PropTypes.string,
};
