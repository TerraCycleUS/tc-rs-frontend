import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import Button from '../../components/Button'
import classes from './RetailerListPage.module.scss'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'
import RetailerList from '../../components/RetailerList'

export default function RetailerListPage() {
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

  return (
    <Page backgroundGrey noSidePadding>
      <h6
        className={classNames(
          classes.yourRetailers,
          'my-text-primary my-color-textPrimary',
        )}
      >
        <FormattedMessage
          id="retailerList:YourRetailers"
          defaultMessage="Your retailers"
        />
      </h6>
      <RetailerList retailers={retailers} to="../monoprix-id" />
      <Link
        className={classes.addMore}
        data-testid="add-retailer"
        to="/registration/select-retailer"
      >
        <Button>
          <FormattedMessage
            id="retailerList:AddMore"
            defaultMessage="Add more"
          />
        </Button>
      </Link>
    </Page>
  )
}
