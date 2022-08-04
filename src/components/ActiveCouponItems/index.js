import { FormattedMessage } from 'react-intl'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import classes from '../CouponItems/CouponItems.module.scss'
import NoCoupons from '../NoCoupons'
import GoToCouponLanding from '../../utils/goToCouponLanding'
import UnlockedCouponDate from '../UnlockedCouponDate'

export default function ActiveCouponItems({ activeCoupons }) {
  const navigate = useNavigate()

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
        }) => (
          <div className={classes.coupon} key={id}>
            <div
              className={classNames(
                classes.topPart,
                'd-flex justify-content-between',
              )}
            >
              <p className={classes.percent}>{discount}%</p>
              <img alt="brand" src={brandLogo} className={classes.brandLogo} />
            </div>
            <button
              type="button"
              onClick={() =>
                GoToCouponLanding(navigate, {
                  id,
                  name,
                  description,
                  brandLogo,
                  backgroundImage,
                  requiredAmount,
                  startDate,
                  endDate,
                  active: true,
                })
              }
              className={classes.landingBtn}
              key={id}
            >
              <p className={classes.text}>{name}</p>
            </button>
            <UnlockedCouponDate startDate={startDate} endDate={endDate} />
            <div className="d-flex justify-content-between align-items-center">
              <div
                className={classNames(
                  classes.numberItems,
                  classes.activeNumberItems,
                )}
              >
                <div className={classes.itemsText}>
                  <FormattedMessage
                    id="couponItems:Items"
                    defaultMessage="{requiredAmount} items"
                    values={{ requiredAmount }}
                  />
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
}
