import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import queryString from 'query-string'
import classes from './CouponLanding.module.scss'
import http from '../../utils/http'
import { ReactComponent as ForwardArrowGreen } from '../../assets/icons/forward-arrow-green.svg'
import RenderUnlocking from '../../components/CouponUnlocking'
import UnlockSuccessful from '../../components/PopUps/UnlockSuccessful'
import LockedCouponDate from '../../components/LockedCouponDate'
import UnlockedCouponDate from '../../components/UnlockedCouponDate'
import CouponUsing from '../../components/CouponUsing'
import ActiveCouponRequirement from '../../components/ActiveCouponRequirement'
import CouponRequirement from '../../components/CouponRequirement'
import useApiCall from '../../utils/useApiCall'
import { CARREFOUR_ID, MONOPRIX_ID } from '../../utils/const'
import Button from '../../components/Button'
import CashTillBarcode from '../../components/PopUps/CashTillBarcode'
import { detectLanguage } from '../../utils/intl'

export default function CouponLanding() {
  const [droppedAmount, setDroppedAmount] = useState(0)
  const user = useSelector((state) => state.user)
  const currentLang = user?.lang || detectLanguage()
  const location = useLocation()
  const {
    userHasThisRetailer,
    categoryId,
    active,
    description,
    brandLogo,
    requiredAmount,
    endDate,
    startDate,
    backgroundImage,
    name,
    id,
    discount,
    minimumPurchaseAmount,
    status,
    brand,
    eanCodePicURL,
  } = location.state || {}
  const navigate = useNavigate()
  const [showPop, setShowPop] = useState(false)
  const apiCall = useApiCall()
  const params = queryString.parse(location.search)
  const retailer = location.state?.retailer || params.retailer
  const getCategoryApiCall = useApiCall()
  const getMyRetailersApiCall = useApiCall()
  const [category, setCategory] = React.useState()
  const [showBarcode, setShowBarcode] = useState(false)
  const [codeToDisplay, setCodeToDisplay] = React.useState('XXXX')

  useEffect(() => {
    getAvailableAmount()
  }, [])

  useEffect(() => {
    getCategoryApiCall(
      () => http.get(`/api/category/public?lang=${currentLang}`),
      (response) => {
        setCategory(response.data.find((item) => item.id === categoryId))
      },
      null,
      null,
      { message: false },
    )
  }, [])

  useEffect(() => {
    getMyRetailersApiCall(
      () => http.get('/api/retailer/my-retailers'),
      (response) => {
        const thisRetailer = response.data?.find((item) => item.id === retailer)
        if (thisRetailer)
          setCodeToDisplay(
            thisRetailer?.userLoyaltyCode || thisRetailer?.userLoyaltyPassCode,
          )
      },
      null,
      null,
      { message: false },
    )
  }, [])

  function backToCoupons() {
    navigate('../rewards', {
      state: {
        active,
        retailer,
      },
      replace: true,
    })
  }

  function getAvailableAmount() {
    if (!user) return
    apiCall(
      () => http.get('/api/user/profile'),
      (response) => {
        setDroppedAmount(response.data.availableAmount)
      },
    )
  }

  function renderPop() {
    if (!showPop) return ''
    return (
      <UnlockSuccessful setShowPop={setShowPop} landing navigate={navigate} />
    )
  }

  function renderRequiredAmount() {
    if (!active)
      return (
        <CouponRequirement
          droppedAmount={droppedAmount}
          requiredAmount={requiredAmount}
        />
      )
    return <ActiveCouponRequirement requiredAmount={requiredAmount} />
  }

  function renderDateStatus() {
    if (!active) return <LockedCouponDate endDate={endDate} forLanding />
    return (
      <UnlockedCouponDate
        startDate={startDate}
        endDate={endDate}
        status={status}
        forLanding
      />
    )
  }

  function renderUsingCoupon() {
    if (!active)
      return (
        <RenderUnlocking
          requiredAmount={requiredAmount}
          id={id}
          availableAmount={droppedAmount}
          setShowPop={setShowPop}
          forLanding
          retailer={retailer}
          userHasThisRetailer={userHasThisRetailer}
        />
      )
    return renderRedeem(retailer)
  }

  function renderRedeem() {
    switch (retailer) {
      case MONOPRIX_ID:
        return <CouponUsing />

      case CARREFOUR_ID:
        return (
          <Button
            notFullWidth
            className={classes.scanBarCode}
            inverted
            onClick={() => setShowBarcode(true)}
          >
            <FormattedMessage
              id="couponLanding:ScanBarcode"
              defaultMessage="Scan Barcode"
            />
          </Button>
        )

      default:
        return null
    }
  }

  return (
    <div className={classNames(classes.landingPage, 'hide-on-exit')}>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className={classes.backGround}
      >
        <button
          className={classes.backButton}
          onClick={() => backToCoupons()}
          type="button"
        >
          <ForwardArrowGreen />
        </button>
      </div>
      <div className={classes.landingWrapper}>
        <div className={classes.landingBody}>
          {renderRequiredAmount()}
          <h6
            className={classNames(
              'fw-bold my-text-description my-color-main',
              classes.category,
            )}
          >
            {category?.title}
          </h6>
          <h3 className={classes.title}>{name}</h3>
          {renderDateStatus()}
          {renderUsingCoupon()}
          <img alt="brand" src={brandLogo} className={classes.brandLogo} />
          <div className={classes.amountDescription}>
            <div className={classes.amountLine}>
              <p>
                <FormattedMessage
                  id="couponLanding:CouponAmount"
                  defaultMessage="Coupon amount:"
                />
              </p>
              <p className={classes.moneyValue}>{discount}€</p>
            </div>
            <div className={classes.amountLine}>
              <p>
                <FormattedMessage
                  id="couponLanding:MinimumPurchase"
                  defaultMessage="Minimum purchase amount:"
                />
              </p>
              <p className={classes.moneyValue}>{minimumPurchaseAmount}€</p>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={classNames(classes.text, 'my-text')}
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
          <ul className={classes.termsSummary}>
            <li>
              <FormattedMessage
                id="couponLanding:PresentCoupon"
                defaultMessage="You should present your loyalty ID number {code}"
                values={{ code: codeToDisplay }}
              />
            </li>
            <li>
              <FormattedMessage
                id="couponLanding:ScannedOnce"
                defaultMessage="The coupon can be scanned only once"
              />
            </li>
          </ul>
          <p
            className={classNames(
              'my-text-description',
              'text-center',
              'my-color-textSecondary',
              classes.brand,
            )}
          >
            {brand}
          </p>
        </div>
      </div>
      {renderPop()}
      {showBarcode && (
        <CashTillBarcode
          brandLogo={brandLogo}
          closePop={() => setShowBarcode(false)}
          eanCodePicURL={eanCodePicURL}
        />
      )}
    </div>
  )
}
