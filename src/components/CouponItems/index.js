import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ReactComponent as Lock } from '../../assets/icons/lock.svg'
import classes from './CouponItems.module.scss'
import NoCoupons from '../NoCoupons'
import useApiCall from '../../utils/useApiCall'
import LockedCouponDate from '../LockedCouponDate'
import needMoreItemsText from '../../utils/textChanging/needMoreItemsText'
import requiredItemsText from '../../utils/textChanging/requiredItemsText'
import { UnlockCoupon } from '../CouponUnlocking'

export default function CouponItems({
  coupons,
  setActiveCoupons,
  setShowPop,
  retailer,
  userHasThisRetailer,
  categories,
}) {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }
  const apiCall = useApiCall()

  const successCb = (response) => {
    setActiveCoupons(response.data)
  }

  function renderUnlocking(requiredAmount, id, availableAmount, categoryName) {
    if (requiredAmount <= availableAmount)
      return (
        <button
          onClick={() =>
            UnlockCoupon({
              id,
              config,
              setShowPop,
              apiCall,
              successCb,
              userHasThisRetailer,
              retailer,
              navigate,
            })
          }
          type="button"
          className={classes.unlockBtn}
        >
          <Lock className={classes.lockIcon} />
          <p className={classes.unlockText}>
            <FormattedMessage id="couponItems:Unlock" defaultMessage="Unlock" />
          </p>
        </button>
      )
    const difference = requiredAmount - availableAmount
    return (
      <div className="d-flex flex-column align-items-end">
        <p className={classes.moreItems}>
          {needMoreItemsText(difference, categoryName)}
        </p>
      </div>
    )
  }

  function getProgressPercentage(requiredAmount, availableAmount) {
    const progress = (availableAmount / requiredAmount) * 100
    if (progress > 100) return '100%'
    return `${progress}%`
  }

  if (!coupons?.length) return <NoCoupons />
  return (
    <>
      {coupons.map(
        ({
          id,
          discount,
          name,
          description,
          brandLogo,
          backgroundImage,
          startDate,
          endDate,
          requiredAmount,
          categoryId,
          minimumPurchaseAmount,
          status,
          brand,
          eanCodePicURL,
          availableAmount,
        }) => (
          <div className={classes.coupon} key={id}>
            <button
              data-testid="landing-btn"
              className={classes.landingBtn}
              type="button"
              onClick={() => {
                navigate(
                  { pathname: '../landing', search: location.search },
                  {
                    state: {
                      id,
                      name,
                      description,
                      brandLogo,
                      backgroundImage,
                      requiredAmount,
                      startDate,
                      endDate,
                      active: false,
                      retailer,
                      categoryId,
                      userHasThisRetailer,
                      discount,
                      minimumPurchaseAmount,
                      status,
                      brand,
                      eanCodePicURL,
                      availableAmount,
                    },
                    replace: true,
                  },
                )
              }}
            >
              <div
                className={classNames(
                  classes.topPart,
                  'd-flex justify-content-between',
                )}
              >
                <p className={classes.percent}>{discount}&euro;</p>
                <img
                  alt="brand"
                  src={brandLogo}
                  className={classes.brandLogo}
                />
              </div>
              <div>
                <p className={classes.text}>{name}</p>
              </div>
              <LockedCouponDate endDate={endDate} />
            </button>
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="d-flex flex-column align-items-center">
                <div
                  className={classNames(classes.numberItems, 'flex-shrink-0')}
                >
                  <div
                    style={{
                      width: getProgressPercentage(
                        requiredAmount,
                        availableAmount,
                      ),
                    }}
                    className={classes.progress}
                  />
                  <div className={classes.itemsText}>
                    {requiredItemsText(requiredAmount)}
                  </div>
                </div>
                <p className={classes.category}>
                  {getCategoryName(categories, categoryId)}
                </p>
              </div>
              {renderUnlocking(
                requiredAmount,
                id,
                availableAmount,
                getCategoryName(categories, categoryId),
              )}
            </div>
          </div>
        ),
      )}
    </>
  )
}

CouponItems.propTypes = {
  coupons: PropTypes.array,
  setActiveCoupons: PropTypes.func,
  setShowPop: PropTypes.func,
  retailer: PropTypes.number,
  userHasThisRetailer: PropTypes.bool,
  categories: PropTypes.array,
}

export function getCategoryName(categories, categoryId) {
  return categories?.find((category) => category.id === categoryId)?.title
}
