import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PopContainer, PopWrapper } from '../GenericPop'
import { ReactComponent as Xmark } from '../../../assets/icons/x-mark.svg'
import { ReactComponent as HappyPlanet } from '../../../assets/icons/happy-planet.svg'
import Button from '../../Button'
import classes from './ThankYou.module.scss'
import http from '../../../utils/http'
import useApiCall from '../../../utils/useApiCall'

export default function ThankYou({ amount, setShowPop }) {
  const user = useSelector((state) => state.user)
  const [availableAmount, setAvailableAmount] = useState(0)
  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

  const successCb = (response) => {
    setAvailableAmount(response.data.availableAmount)
  }

  const apiCall = useApiCall()

  useEffect(() => {
    apiCall(() => http.get('/api/user/profile', config), successCb)
  }, [])

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
        <div className={classes.text}>
          <FormattedMessage
            id="thankYou:YouRecycled"
            defaultMessage="You have recycled "
          />
          {amount}
          <FormattedMessage
            id="thankYou:NewItems"
            defaultMessage=" new items"
          />
        </div>
        <p className={classes.text}>
          <FormattedMessage
            id="thankYou:NowRecycled"
            defaultMessage="You have now recycled:"
          />
        </p>
        <p className={classes.greenText}>
          {availableAmount}
          <FormattedMessage id="thankYou:Items" defaultMessage=" items" />
        </p>
        <Link className={classes.button} to="/rewards">
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
