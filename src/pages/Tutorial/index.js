import React, { useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Page from '../../Layouts/Page'
import { ReactComponent as RecycleSave } from '../../assets/icons/recycle-save.svg'
import { ReactComponent as GetRewards } from '../../assets/images/get-rewards.svg'
import { ReactComponent as DropThemOff } from '../../assets/images/drop-them-off.svg'
import { ReactComponent as ScanYourItems } from '../../assets/images/scan-your-items.svg'
import classes from './Tutorial.module.scss'
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css'
import './_forSplide.scss'
import Button from '../../components/Button'

export default function Tutorial() {
  const [currentSlide, setCurrentSlide] = useState(0)

  function renderBtn() {
    if (currentSlide === 2 || currentSlide === -1) return <Proceed />
    return <SkipTutorial />
  }
  return (
    <Page innerClassName={classes.historyPage}>
      <RecycleSave className={classes.icon} />
      <Splide
        onMoved={(splide, newIndex) => {
          setCurrentSlide(newIndex)
        }}
        onDestroy={() => {
          setCurrentSlide(-1)
        }}
        options={{
          type: 'slide',
          rewind: true,
          arrows: false,
          destroy: true,
          pagination: false,
          breakpoints: {
            1300: {
              gap: 0,
              destroy: false,
              perPage: 1,
              pagination: true,
            },
          },
        }}
        className={classes.stepsContainer}
      >
        <SplideSlide className={classes.step}>
          <h3 className={classes.stepTitle}>
            <FormattedMessage
              id="Tutorial:Scan"
              defaultMessage="Scan your items"
            />
          </h3>
          <p className={classes.stepText}>
            <FormattedMessage
              id="Tutorial:ScanText"
              defaultMessage="Scan accepted products and packaging to save them in your recycling bin."
            />
          </p>
          <ScanYourItems />
        </SplideSlide>
        <SplideSlide className={classes.step}>
          <h3 className={classes.stepTitle}>
            <FormattedMessage
              id="Tutorial:Drop"
              defaultMessage="Drop them off"
            />
          </h3>
          <p className={classes.stepText}>
            <FormattedMessage
              id="Tutorial:DropText"
              defaultMessage="Find your local Monoprix and drop off your scanned products and packaging at the dedicated recycling point."
            />
          </p>
          <DropThemOff />
        </SplideSlide>
        <SplideSlide className={classes.step}>
          <h3 className={classes.stepTitle}>
            <FormattedMessage
              id="Tutorial:Rewards"
              defaultMessage="Get Rewards"
            />
          </h3>
          <p className={classes.stepText}>
            <FormattedMessage
              id="Tutorial:RewardsText"
              defaultMessage="The more you recycle, the more rewards you will earn."
            />
          </p>
          <GetRewards />
        </SplideSlide>
      </Splide>

      <Link className={classes.link} to="/">
        {renderBtn()}
      </Link>
    </Page>
  )
}

function SkipTutorial() {
  return (
    <h6 className={classes.linkText}>
      <FormattedMessage id="Tutorial:Skip" defaultMessage="Skip tutorial" />
    </h6>
  )
}

function Proceed() {
  return (
    <Button className={classes.linkBtn}>
      <FormattedMessage id="Tutorial:GetStarted" defaultMessage="Get started" />
    </Button>
  )
}
