import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import classes from './RetailerList.module.scss'
import { ReactComponent as ForwardIcon } from '../../assets/icons/forward.svg'

export default function RetailerList({ retailers }) {
  return (
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
  )
}

RetailerList.propTypes = {
  retailers: PropTypes.array,
}
