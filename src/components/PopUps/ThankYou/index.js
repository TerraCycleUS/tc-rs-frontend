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

  function recycledItemsText() {
    if (amount > 1)
      return (
        <FormattedMessage
          id="thankYou:YouRecycled"
          defaultMessage="You have recycled {amount} new items"
          values={{ amount }}
        />
      )
    return (
      <FormattedMessage
        id="thankYou:YouRecycledSingular"
        defaultMessage="You have recycled {amount} new item"
        values={{ amount }}
      />
    )
  }

  function totalItemsText() {
    if (availableAmount > 1)
      return (
        <FormattedMessage
          id="thankYou:NowRecycled"
          defaultMessage="In total you have now recycled: <green>{availableAmount} items</green>"
          values={{
            availableAmount,
            green: (chunks) => (
              <span className={classes.greenText}>{chunks}</span>
            ),
          }}
        />
      )
    return (
      <FormattedMessage
        id="thankYou:NowRecycledSingular"
        defaultMessage="In total you have now recycled: <green>{availableAmount} item</green>"
        values={{
          availableAmount,
          green: (chunks) => (
            <span className={classes.greenText}>{chunks}</span>
          ),
        }}
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
        <div className={classes.text}>{recycledItemsText()}</div>
        <p className={classes.text}>{totalItemsText()}</p>
        <Link className={classes.button} to="/rewards-wallet/rewards">
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
