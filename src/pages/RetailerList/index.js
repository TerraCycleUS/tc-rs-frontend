import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Page from '../../Layouts/Page'
import Button from '../../components/Button'
import { ReactComponent as ForwardIcon } from '../../assets/icons/forward.svg'
import Carrefour from '../../assets/icons/carrefour.png'
import MonoprixSrc from '../../assets/icons/monoprix.png'
import classes from './RetailerList.module.scss'

const usersRetailers = [
  { id: 0, name: 'Monoprix', iconSrc: MonoprixSrc },
  { id: 1, name: 'Carrefour', iconSrc: Carrefour },
]

export default function RetailerList() {
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
        {usersRetailers.map(({ id, name, iconSrc }) => (
          <li key={id} className={classes.retailerItem}>
            <Link
              className={classes.retailerLink}
              to="../monoprix-id"
              state={{ retailer: name }}
            >
              <div className={classes.retailerContainer}>
                <div className={classes.iconContainer}>
                  <img
                    className={classes.retailerIcon}
                    src={iconSrc}
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
      <Link className={classes.addMore} to="/registration/select-retailer">
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
