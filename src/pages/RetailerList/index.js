import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import Button from '../../components/Button'
import { ReactComponent as ForwardIcon } from '../../assets/icons/forward.svg'
import classes from './RetailerList.module.scss'
import useApiCall from '../../utils/useApiCall'
import http from '../../utils/http'

export default function RetailerList() {
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
      <ul className={classes.retailerList}>
        {retailers.map(({ id, name, smallLogo, userRetailerCode }) => (
          <li key={id} className={classes.retailerItem}>
            <Link
              className={classes.retailerLink}
              to="../monoprix-id"
              state={{ retailer: id, userRetailerCode }}
              data-testid="change-retailer-code"
            >
              <div className={classes.retailerContainer}>
                <div className={classes.iconContainer}>
                  <img
                    className={classes.retailerIcon}
                    src={smallLogo}
                    alt={name}
                  />
                </div>
                <p className="my-text my-color-textPrimary">{name}</p>
              </div>
              <ForwardIcon />
            </Link>
          </li>
        ))}
      </ul>
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
