import React, { useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import bwipjs from 'bwip-js'
import { FormattedMessage } from 'react-intl'
import popClasses from '../GenericPop/GenericPop.module.scss'
import classes from './CashTillBarcode.module.scss'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'

export default function CashTillBarcode({
  closePop,
  brandLogo,
  eanCodePicURL,
  codeToDisplay,
  eanCode,
}) {
  useEffect(() => {
    if (eanCode) {
      bwipjs.toCanvas('canvasBarCode', {
        bcid: 'code128',
        text: eanCode,
        scale: 2,
        height: 15,
        includetext: true,
        textxalign: 'center',
      })
    }
  }, [])

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

        {eanCodePicURL && (
          <img className={classes.barcode} alt="barcode" src={eanCodePicURL} />
        )}
        <canvas id="canvasBarCode"></canvas>
      </div>
    </div>
  )
}
CashTillBarcode.propTypes = {
  closePop: PropTypes.func,
  brandLogo: PropTypes.string,
  eanCodePicURL: PropTypes.string,
  codeToDisplay: PropTypes.string,
  eanCode: PropTypes.string,
}
