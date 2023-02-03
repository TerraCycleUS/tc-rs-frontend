import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import Button from '../../Button'
import classes from './PasswordSuccess.module.scss'
import imageUrl from '../../../assets/images/drop-them-off.svg'

export default function PasswordSuccess({ onClose, next }) {
  return (
    <PopWrapper className={classes.wrapper}>
      <PopContainer className={classes.container}>
        <Xmark onClick={onClose} className="close-btn" />
        <h3
          className={classNames(
            classes.heading,
            'my-color-textBlack my-text-h2',
          )}
        >
          <FormattedMessage
            id="passwordSuccess:Title"
            defaultMessage="Successful password setup"
          />
        </h3>
        <img
          src={imageUrl}
          alt="successful password setup"
          className="d-block"
        />
        <p className="my-text my-color-textPrimary text-center">
          <FormattedMessage
            id="passwordSuccess:Desc1"
            defaultMessage="Thank you! You can now choose retailers and drop off your items to be recycled "
          />
        </p>
        <Button className={classes.next} onClick={next}>
          <FormattedMessage
            id="passwordSuccess:Next"
            defaultMessage="Select retailer"
          />
        </Button>
        <Link
          to="/"
          className={classNames(
            'my-text-primary my-color-main',
            classes.cancel,
          )}
        >
          <FormattedMessage
            id="passwordSuccess:Cancel"
            defaultMessage="Save and come back later"
          />
        </Link>
      </PopContainer>
    </PopWrapper>
  )
}

PasswordSuccess.propTypes = {
  onClose: PropTypes.func,
  next: PropTypes.func,
}
