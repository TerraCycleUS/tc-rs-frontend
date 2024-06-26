import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import queryString from "query-string";

import classes from "./CouponLanding.module.scss";
import http from "../../utils/http";
import { ReactComponent as UnlockIcon } from "../../assets/icons/unlock.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";
import { ReactComponent as ForwardArrowGreen } from "../../assets/icons/forward-arrow-green.svg";
import { unlockCoupon } from "../../components/CouponUnlocking";
import UnlockSuccessful from "../../components/PopUps/UnlockSuccessful";
import UnlockedCouponDate from "../../components/UnlockedCouponDate";
import useApiCall from "../../utils/useApiCall";
import CashTillBarcode from "../../components/PopUps/CashTillBarcode";
import { getCategoryName } from "../../components/CouponItems";
import ProgressBar from "../../components/CouponItems/ProgressBar";
import { useSelector } from "react-redux";
import MoreItemsText from "../../components/CouponItems/MoreItemsText";
import Button from "../../components/Button";
import { CARREFOUR_ID, MONOPRIX_ID } from "../../utils/const";
import MonoprixTerms from "./MonoprixTerms";
import useCategories from "../../utils/useCategories";

export default function CouponLanding() {
  const location = useLocation();
  const {
    userHasThisRetailer,
    categoryId,
    active,
    description,
    retailerLogo,
    requiredAmount,
    endDate,
    startDate,
    brandLogo,
    name,
    id,
    discount,
    minimumPurchaseAmount,
    status,
    availableAmount,
    eanCode,
    backPath,
    discountCurrency,
    retailerId,
  } = location.state || {};
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { categories } = useCategories();

  const [showPop, setShowPop] = useState(false);
  const params = queryString.parse(location.search);
  const retailer = location.state?.retailer || params.retailer;
  const getMyRetailersApiCall = useApiCall();
  const [showBarcode, setShowBarcode] = useState(location.state?.showBarcode);
  const [codeToDisplay, setCodeToDisplay] = React.useState("XXXX");
  useEffect(() => {
    getMyRetailersApiCall(
      () => http.get("/api/retailer/my-retailers"),
      (response) => {
        const thisRetailer = response.data?.find(
          (item) => item.id === retailerId
        );
        if (thisRetailer)
          setCodeToDisplay(
            thisRetailer?.userLoyaltyCode || thisRetailer?.userLoyaltyPassCode
          );
      },
      null,
      null,
      { message: false }
    );
  }, []);

  function backTo() {
    let path = "../rewards";
    if (backPath) path = backPath;
    navigate(path, {
      state: {
        active,
        retailer,
      },
      replace: true,
    });
  }

  function renderPop() {
    if (!showPop) return "";
    return (
      <UnlockSuccessful setShowPop={setShowPop} landing navigate={navigate} />
    );
  }
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  };
  const { formatMessage } = useIntl();
  const apiCall = useApiCall();
  const successCb = () => {};
  const unlockClickHandler = () =>
    active
      ? setShowBarcode(true)
      : unlockCoupon({
          id,
          config,
          setShowPop,
          apiCall,
          successCb,
          userHasThisRetailer,
          retailer,
          navigate,
          formatMessage,
        });

  const locked = !active && requiredAmount > (availableAmount || 0);

  let buttonContent = (
    <FormattedMessage
      id="couponLanding:ScanBarcode"
      defaultMessage="Scan Barcode"
    />
  );
  if (!active) {
    buttonContent = (
      <>
        {locked ? (
          <LockIcon className={classes.lockIcon} />
        ) : (
          <UnlockIcon className={classes.lockIcon} />
        )}
        <p className={classes.unlockText}>
          <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
        </p>
      </>
    );
  }
  return (
    <div className={classNames(classes.landingPage, "hide-on-exit")}>
      <div>
        <img src={brandLogo} alt={name} className={classes.bgImage} />
        <button
          className={classes.backButton}
          onClick={() => backTo()}
          type="button"
        >
          <ForwardArrowGreen />
        </button>
      </div>
      <div className={classes.landingWrapper}>
        {!active ? (
          <ProgressBar
            roundedBottom={false}
            availableItemsCount={availableAmount}
            requiredItemsCount={requiredAmount}
            className={classes.landingProgressBar}
          />
        ) : null}
        <div className={classes.landingBody}>
          <h3 className={classes.title}>{name}</h3>
          <UnlockedCouponDate
            startDate={startDate}
            endDate={endDate}
            status={status}
          />
          <Button
            disabled={locked}
            onClick={unlockClickHandler}
            customContent={!active}
            className={classNames(
              classes.unlockButton,
              "d-flex align-items-center justify-content-center fw-bold"
            )}
          >
            {buttonContent}
          </Button>
          {!active ? (
            <p
              className={classNames(
                "my-text-description my-color-textPrimary",
                classes.moreItems
              )}
            >
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
          ) : null}
          <p
            className={classNames(
              "my-text-description text-center my-color-textSecondary",
              classes.moreItems
            )}
          >
            {retailerId === MONOPRIX_ID ? (
              <FormattedMessage
                id="couponItems:LandingDescriptionMnp"
                defaultMessage="To use this coupon, scan it at the checkout of a Monoprix store."
              />
            ) : (
              <FormattedMessage
                id="couponItems:LandingDescription"
                defaultMessage="To use this coupon, scan it at the checkout of your participating store."
              />
            )}
          </p>
          <img
            alt="brand"
            src={retailerLogo}
            className={classNames(classes.brandLogo)}
          />
          <div className={classes.amountDescription}>
            <div className={classes.amountLine}>
              <p>
                <FormattedMessage
                  id="couponLanding:CouponAmount"
                  defaultMessage="Coupon amount:"
                />
              </p>
              <p className={classes.moneyValue}>
                {discountCurrency === "%" ? "-" : ""}
                {discount}
                {discountCurrency}
              </p>
            </div>
            <div className={classes.amountLine}>
              {minimumPurchaseAmount ? (
                <>
                  <p>
                    <FormattedMessage
                      id="couponLanding:MinimumPurchase"
                      defaultMessage="Minimum purchase amount:"
                    />
                  </p>
                  <p className={classes.moneyValue}>{minimumPurchaseAmount}€</p>
                </>
              ) : (
                <p>
                  <FormattedMessage
                    id="couponLanding:NoMinimumPurchase"
                    defaultMessage="No minimum purchase"
                  />
                </p>
              )}
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={classNames(classes.text, "my-text")}
          />
          <Link
            to="/profile/terms"
            data-testid="terms-and-conditions"
            className={classes.termsWrapper}
          >
            <p className={classes.terms}>
              <FormattedMessage
                id="couponLanding:Terms"
                defaultMessage="Terms & conditions"
              />
            </p>
          </Link>
          {retailerId === MONOPRIX_ID ? (
            <MonoprixTerms />
          ) : (
            <ul className={classes.termsSummary}>
              <li>
                <FormattedMessage
                  id="couponLanding:WhereToUse"
                  defaultMessage="The coupon should be used in the store you dropped off the items to be recycled"
                />
              </li>
              <li>
                <FormattedMessage
                  id="couponLanding:PresentCoupon"
                  defaultMessage="One coupon redeemable per item purchased. Coupons cannot be combined."
                />
              </li>
              <li>
                <FormattedMessage
                  id="couponLanding:ScannedOnce"
                  defaultMessage="The coupon can be scanned only once"
                />
              </li>
            </ul>
          )}
        </div>
      </div>
      {renderPop()}
      {showBarcode && (
        <CashTillBarcode
          brandLogo={brandLogo}
          closePop={() => setShowBarcode(false)}
          codeToDisplay={codeToDisplay}
          eanCode={eanCode}
          verticalDirection={retailerId === CARREFOUR_ID}
        />
      )}
    </div>
  );
}
