import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import WhitePageWrapper from '../../components/WhitePageWrapper'
import classes from './ScanOrTypeCarrefour.module.scss'
import CarrefourLoyaltyHint from '../../components/PopUps/CarrefourLoyaltyHint'
import Button from '../../components/Button'
import LearnMoreBtn from '../../components/LearnMoreBtn'
import imgSrc from '../../assets/images/carrefour-card.png'

export default function ScanOrTypeCarrefour() {
  const [showHint, setShowHint] = useState(false)

  return (
    <WhitePageWrapper>
      <div className={classes.container}>
        <img
          className={classNames('d-block w-100', classes.image)}
          src={imgSrc}
          alt="Carrefour card"
        />
        <p
          className={`my-text my-color-textPrimary text-center ${classes.text}`}
        >
          <FormattedMessage
            id="scanOrTypeCarrefour:Text"
            defaultMessage="Please take a picture of the loyalty ID located in the back of your Carrefour or Pass card to register {learnMore}"
            values={{
              learnMore: <LearnMoreBtn onClick={() => setShowHint(true)} />,
            }}
          />
        </p>
        <Link to="/scan-loyalty-card">
          <Button className={classes.takePicture}>
            <FormattedMessage
              id="scanOrTypeCarrefour:TakePicture"
              defaultMessage="Take a picture"
            />
          </Button>
        </Link>

        <Link
          to="../registration/retailers-id"
          state={{ retailer: 2, name: 'Carrefour' }}
        >
          <Button inverted className={classes.manually}>
            <FormattedMessage
              id="scanOrTypeCarrefour:AddManually"
              defaultMessage="Add manually"
            />
          </Button>
        </Link>

        {showHint && (
          <CarrefourLoyaltyHint closePop={() => setShowHint(false)} />
        )}
      </div>
    </WhitePageWrapper>
  )
}
