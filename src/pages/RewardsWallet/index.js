import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Page from '../../Layouts/Page'
import { ReactComponent as CouponCards } from '../../assets/icons/coupon-cards.svg'
import classes from './RewardsWallet.module.scss'
import Button from '../../components/Button'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import RetailerList from '../../components/RetailerList'

export default function RewardsWallet() {
  const [retailers, setRetailers] = useState([])
  const getMyRetailersApiCall = useApiCall()

  useEffect(() => {
    getMyRetailersApiCall(
      () => http.get('/api/retailer/my-retailers'),
      (response) => {
        setRetailers(response.data)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  function renderRetailers() {
    if (!retailers?.length) return <NoRetailers />
    return <RetailerList retailers={retailers} to="rewards" />
  }

  return (
    <Page pdTop30 backgroundGrey noSidePadding footer>
      <h4 className={classNames('my-text-h4 my-color-main', classes.heading)}>
        {retailers?.length ? (
          <FormattedMessage
            id="rewardsWallet:SelectRetailer"
            defaultMessage="Select Retailer"
          />
        ) : (
          <FormattedMessage
            id="rewardsWallet:AddRetailer"
            defaultMessage="Add Retailer"
          />
        )}
      </h4>
      {retailers?.length ? (
        <p className={classNames(classes.description, 'my-color-textPrimary')}>
          <FormattedMessage
            id="rewardsWallet:Description"
            defaultMessage="Select the retailer you want to redeem your rewards for"
          />
        </p>
      ) : null}
      {renderRetailers()}
      <Link
        className={classes.addAnotherBtn}
        data-testid="add-retailer"
        to="/registration/select-retailer"
      >
        <Button>
          {retailers?.length ? (
            <FormattedMessage
              id="retailerList:AddAnother"
              defaultMessage="Add another retailer"
            />
          ) : (
            <FormattedMessage
              id="retailerList:AddRetailer"
              defaultMessage="Add a retailer"
            />
          )}
        </Button>
      </Link>
    </Page>
  )
}

function NoRetailers() {
  return (
    <div className={classes.noRetailersContainer}>
      <CouponCards className={classes.illustration} />
      <p className={classNames(classes.noRetailers, 'my-text')}>
        <FormattedMessage
          id="rewardsWallet:NoRetailers"
          defaultMessage="Add a retailer to collect discount coupons!"
        />
      </p>
    </div>
  )
}
