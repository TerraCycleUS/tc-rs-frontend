import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import popClasses from '../GenericPop/GenericPop.module.scss'
import classes from './CashTillBarcode.module.scss'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'

export default function CashTillBarcode({
  closePop,
  brandLogo,
  eanCodePicURL,
  codeToDisplay,
}) {
  return (
    <div className={`${popClasses.popWrapper} ${classes.background}`}>
      <div
        className={classNames(
          popClasses.popContainer,
          popClasses.max400,
          classes.filter,
        )}
      >
        <Xmark onClick={() => closePop()} className={popClasses.closeBtn} />
        <img alt="brand" src={brandLogo} className={classes.brandLogo} />
        <p className={classNames('my-text-description', classes.code)}>
          <FormattedMessage
            id="cashTillBarcode:Loyalty"
            defaultMessage="Carrefour ID: {code}"
            values={{
              code: <span className={classes.bolder}>{codeToDisplay}</span>,
            }}
          />
        </p>
        <img className={classes.barcode} alt="barcode" src={eanCodePicURL} />
      </div>
    </div>
  )
}
CashTillBarcode.propTypes = {
  closePop: PropTypes.func,
  brandLogo: PropTypes.string,
  eanCodePicURL: PropTypes.string,
  codeToDisplay: PropTypes.string,
}
