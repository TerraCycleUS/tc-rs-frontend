import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import classes from './CarrefourLoyaltyHint.module.scss'
import popClasses from '../GenericPop/GenericPop.module.scss'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import CardPass from '../../../assets/images/card-pass.jpg'
import CardCarrefour from '../../../assets/images/card-carrefour.jpg'

export default function CarrefourLoyaltyHint({ closePop }) {
  return (
    <div className={popClasses.popWrapper}>
      <div
        className={classNames(
          popClasses.popContainer,
          popClasses.max400,
          classes.popContainer,
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
            id="carrefourLoyaltyHint:Title"
            defaultMessage="Loyalty ID"
          />
        </h2>
        <p
          className={classNames(
            'my-text my-color-textPrimary text-center',
            classes.text,
          )}
        >
          <FormattedMessage
            id="carrefourLoyaltyHint:Description"
            defaultMessage="You can find your Loyalty ID on your cards as highlighted below:"
          />
        </p>
        <p className={classes.cardLabel}>
          <FormattedMessage
            id="carrefourLoyaltyHint:CarrefourCard"
            defaultMessage="Carrefour Card"
          />
        </p>
        <div className={classNames(classes.cardWrap, classes.carrefourCard)}>
          <img
            src={CardCarrefour}
            alt="carrefour card"
            className={classes.cardImg}
          />
        </div>
        <p className={classes.cardLabel}>
          <FormattedMessage
            id="carrefourLoyaltyHint:PassCard"
            defaultMessage="Pass Card"
          />
        </p>
        <div className={classNames(classes.cardWrap, classes.passCard)}>
          <img src={CardPass} alt="pass card" className={classes.cardImg} />
        </div>
      </div>
    </div>
  )
}
CarrefourLoyaltyHint.propTypes = {
  closePop: PropTypes.func,
}
