import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import classNames from 'classnames'
import Button from '../../Button'
import classes from './PleaseRegister.module.scss'
import popClasses from '../GenericPop/GenericPop.module.scss'

export default function PleaseRegister({
  closePop,
  unregisteredRetailer,
  user,
  currentRetailerId,
  onClick,
  redirect = '',
}) {
  function getLink() {
    if (!user) return { pathname: '/registration' }

    if (redirect) {
      return {
        pathname: '/registration/retailers-id',
        search: queryString.stringify({ redirect }),
        state: { retailer: currentRetailerId, name: unregisteredRetailer },
      }
    }

    return {
      pathname: '/registration/select-retailer',
      state: { retailer: currentRetailerId },
    }
  }
  const link = getLink()

  return (
    <div className={popClasses.popWrapper}>
      <div
        className={classNames(
          popClasses.popContainer,
          popClasses.max400,
          classes.container,
        )}
      >
        <h2
          className={classNames(
            'my-text-h2',
            'my-color-textBlack',
            classes.title,
          )}
        >
          <FormattedMessage
            id="pleaseRegister:Title"
            defaultMessage="Please register"
            values={{ retailerName: unregisteredRetailer }}
          />
        </h2>
        <p className={classNames('my-text my-color-textPrimary', classes.text)}>
          <FormattedMessage
            id="pleaseRegister:Description"
            defaultMessage="You have not registered to {retailerName}. In order to drop off the waste you need to register."
            values={{ retailerName: unregisteredRetailer }}
          />
        </p>
        <Link
          className={classes.linkBtn}
          to={{ pathname: link.pathname, search: link.search }}
          state={link.state}
          onClick={onClick}
        >
          <Button>
            <FormattedMessage
              id="pleaseRegister:RegisterNow"
              defaultMessage="Register Now"
            />
          </Button>
        </Link>
        <Button
          className={classes.cancelBtn}
          inverted
          onClick={() => closePop()}
        >
          <FormattedMessage
            id="pleaseRegister:Cancel"
            defaultMessage="Cancel"
          />
        </Button>
      </div>
    </div>
  )
}

PleaseRegister.propTypes = {
  closePop: PropTypes.func,
  unregisteredRetailer: PropTypes.string,
  user: PropTypes.object,
  currentRetailerId: PropTypes.number,
  onClick: PropTypes.func,
  redirect: PropTypes.string,
}
