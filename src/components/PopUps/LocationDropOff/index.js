import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Button from '../../Button'
import classes from './LocationDropOff.module.scss'
import popClasses from '../GenericPop/GenericPop.module.scss'

export default function LocationDropOffPopup({
  setShow,
  onStart,
  brand,
  location,
}) {
  function stopShowingForThisSession() {
    if (!sessionStorage.stopShowingThis) sessionStorage.stopShowingThis = true
    setShow(false)
  }

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
            id="locationDropOff:Title"
            defaultMessage="Hello!"
          />
        </h2>
        <p className={classNames('my-text my-color-textPrimary', classes.text)}>
          <FormattedMessage
            id="locationDropOff:Description"
            defaultMessage="We see that you are at {brand} store located in {location}. Do you want to drop off the waste?"
            values={{ brand, location }}
          />
        </p>
        <Button onClick={onStart} className={classes.linkBtn}>
          <FormattedMessage
            id="locationDropOff:Continue"
            defaultMessage="Continue"
          />
        </Button>
        <Button
          className={classes.cancelBtn}
          inverted
          onClick={() => stopShowingForThisSession()}
        >
          <FormattedMessage
            id="locationDropOff:Cancel"
            defaultMessage="Cancel"
          />
        </Button>
      </div>
    </div>
  )
}

LocationDropOffPopup.propTypes = {
  onStart: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  brand: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}
