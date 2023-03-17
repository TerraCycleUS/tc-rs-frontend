import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import WhitePageWrapper from '../../components/WhitePageWrapper'
import classes from './ScanOrTypeCarrefour.module.scss'
import CarrefourLoyaltyHint from '../../components/PopUps/CarrefourLoyaltyHint'
import Button from '../../components/Button'
import LearnMoreBtn from '../../components/LearnMoreBtn'
import imgSrc1 from '../../assets/images/carrefour-card.png'
import imgSrc2 from '../../assets/images/carrefour-card-2.svg'

export default function ScanOrTypeCarrefour() {
  const [showHint, setShowHint] = useState(false)

  return (
    <WhitePageWrapper noBackBtn>
      <div className={classes.container}>
        <img
          className={classNames('d-block mx-auto', classes.image)}
          src={imgSrc1}
          alt="Carrefour card 1"
        />
        <img
          className={classNames('d-block mx-auto', classes.image)}
          src={imgSrc2}
          alt="Carrefour card 2"
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

        <p
          className={classNames(
            classes.dontHave,
            'text-center',
            'my-text',
            'my-color-textPrimary',
          )}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:dontHave"
            defaultMessage="Don’t have a Carrefour ID?"
          />
        </p>

        <a
          href={process.env.REACT_APP_CREATE_NOW_CARREFOUR}
          target="_blank"
          className={classes.createNow}
        >
          <FormattedMessage
            id="carrefourLoyaltyId:CreateNow"
            defaultMessage="Create now"
          />
        </a>

        {showHint && (
          <CarrefourLoyaltyHint closePop={() => setShowHint(false)} />
        )}
      </div>
    </WhitePageWrapper>
  )
}
