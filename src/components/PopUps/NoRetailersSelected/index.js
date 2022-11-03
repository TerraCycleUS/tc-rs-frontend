import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Button from '../../Button'
import popClasses from '../GenericPop/GenericPop.module.scss'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import classes from './NoRetailersSelected.module.scss'

export default function NoRetailersSelected({ closePop, openFilter }) {
  function openRetailerFilter() {
    openFilter()
    closePop()
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
        <Xmark onClick={() => closePop()} className={popClasses.closeBtn} />
        <h2
          className={classNames(
            'my-text-h2',
            'my-color-textBlack',
            classes.title,
          )}
        >
          <FormattedMessage
            id="noRetailersSelected:Heading"
            defaultMessage="No retailers to display"
          />
        </h2>
        <p className={classNames('my-text my-color-textPrimary', classes.text)}>
          <FormattedMessage
            id="noRetailersSelected:Description"
            defaultMessage="Please search a retailer’s name or select one from the filter."
          />
        </p>
        <Button
          className={classes.okayBtn}
          onClick={() => openRetailerFilter()}
        >
          <FormattedMessage
            id="noRetailersSelected:Okay"
            defaultMessage="Okay!"
          />
        </Button>
      </div>
    </div>
  )
}

NoRetailersSelected.propTypes = {
  closePop: PropTypes.func,
  openFilter: PropTypes.func,
}
