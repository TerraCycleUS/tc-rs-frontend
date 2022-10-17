import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import { ReactComponent as CouponCards } from '../../assets/icons/coupon-cards.svg'
import classes from '../RetailerListPage/RetailerListPage.module.scss'
import Button from '../../components/Button'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import RetailerList from '../../components/RetailerList'

export default function RewardsWallet() {
  const [retailers, setRetailers] = useState([])
  const getMyRetailersApiCall = useApiCall()
  const user = useSelector((state) => state.user)

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  useEffect(() => {
    getMyRetailersApiCall(
      () => http.get('/api/retailer/my-retailers', config),
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
    <Page backgroundGrey noSidePadding>
      <h4>
        <FormattedMessage
          id="rewardsWallet:SelectRetailer"
          defaultMessage="Select Retailer"
        />
      </h4>
      <p>
        <FormattedMessage
          id="rewardsWallet:Description"
          defaultMessage="Select the retailer you want to redeem your rewards for"
        />
      </p>
      {renderRetailers()}
      <Link
        className={classes.addMore}
        data-testid="add-retailer"
        to="/registration/select-retailer"
      >
        <Button>
          <FormattedMessage
            id="retailerList:AddAnother"
            defaultMessage="Add another retailer"
          />
        </Button>
      </Link>
    </Page>
  )
}

function NoRetailers() {
  return (
    <div>
      <CouponCards />
      <p>
        <FormattedMessage
          id="rewardsWallet:NoRetailers"
          defaultMessage="No retailers found."
        />
      </p>
    </div>
  )
}
