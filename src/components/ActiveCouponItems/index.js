import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate, useLocation } from 'react-router-dom'
import classes from '../CouponItems/CouponItems.module.scss'
import NoCoupons from '../NoCoupons'
import UnlockedCouponDate from '../UnlockedCouponDate'
import CouponHeader from '../CouponHeader'
import { getRetailerIcon } from '../CouponItems'
import requiredItemsText from '../../utils/textChanging/requiredItemsText'

export default function ActiveCouponItems({
  activeCoupons,
  retailer,
  userHasThisRetailer,
  categories,
  retailers,
}) {
  const navigate = useNavigate()
  const location = useLocation()

  if (!activeCoupons?.length) return <NoCoupons />
  return (
    <>
      {activeCoupons.map(
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
          retailerId,
          expirationDate,
          eanCode,
        }) => (
          <div className={classes.coupon} key={id}>
            <button
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
                      active: true,
                      retailer,
                      categoryId,
                      userHasThisRetailer,
                      discount,
                      minimumPurchaseAmount,
                      status,
                      brand,
                      eanCodePicURL,
                      availableAmount,
                      categories,
                      expirationDate,
                      eanCode,
                    },
                    replace: true,
                  },
                )
              }}
              className={classes.landingBtn}
              key={id}
            >
              <div
                className={classNames(
                  classes.topPart,
                  'd-flex justify-content-between',
                )}
              >
                <p className={classes.percent}>{discount}&euro;</p>
                <CouponHeader
                  backgroundImage={backgroundImage}
                  brandLogo={getRetailerIcon(retailers, retailerId)}
                />
              </div>
              <div>
                <p className={classes.text}>{name}</p>
              </div>
              <UnlockedCouponDate
                startDate={startDate}
                endDate={endDate}
                status={status}
                expirationDate={expirationDate}
              />
            </button>
            <div className="d-flex justify-content-between align-items-center">
              <div
                className={classNames(
                  classes.numberItems,
                  classes.activeNumberItems,
                )}
              >
                <div className={classes.itemsText}>
                  {requiredItemsText(requiredAmount)}
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </>
  )
}

ActiveCouponItems.propTypes = {
  activeCoupons: PropTypes.array,
  retailer: PropTypes.number,
  userHasThisRetailer: PropTypes.bool,
  categories: PropTypes.array,
  retailers: PropTypes.array,
}
