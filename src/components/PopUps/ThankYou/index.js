import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import { ReactComponent as HappyPlanet } from '../../../assets/icons/happy-planet.svg'
import Button from '../../Button'
import classes from './ThankYou.module.scss'
import http from '../../../utils/http'
import useApiCall from '../../../utils/useApiCall'

export default function ThankYou({ amount, setShowPop }) {
  const [availableAmount, setAvailableAmount] = useState(0)

  const successCb = (response) => {
    setAvailableAmount(response.data.availableAmount)
  }

  const apiCall = useApiCall()

  useEffect(() => {
    apiCall(() => http.get('/api/user/profile'), successCb)
  }, [])

  function renderAmount() {
    return (
      <FormattedMessage
        id="thankYou:YouRecycled"
        defaultMessage="You have recycled {amount} items today, and have now recycled {availableAmount} items in total."
        values={{ amount, availableAmount }}
      />
    )
  }

  return (
    <PopWrapper>
      <PopContainer>
        <Xmark onClick={() => setShowPop(false)} className="close-btn" />
        <h2 className={classes.heading}>
          <FormattedMessage
            id="thankYou:ThankYou"
            defaultMessage="Thank you!"
          />
        </h2>
        <HappyPlanet />
        <p className={classNames('text-center my-text', classes.amount)}>
          {renderAmount()}
        </p>
        <Link className={classes.button} to="/rewards-wallet">
          <Button>
            <FormattedMessage
              id="thankYou:Coupons"
              defaultMessage="See my coupons"
            />
          </Button>
        </Link>
      </PopContainer>
    </PopWrapper>
  )
}
ThankYou.propTypes = {
  amount: PropTypes.number,
  setShowPop: PropTypes.func,
}
