import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss'
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/navigation'
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss/pagination'
import { Pagination } from 'swiper'
import PropTypes from 'prop-types'
import Page from '../../Layouts/Page'
import { ReactComponent as GetRewards } from '../../assets/images/get-rewards.svg'
import { ReactComponent as DropThemOff } from '../../assets/images/drop-them-off.svg'
import { ReactComponent as ScanYourItems } from '../../assets/images/scan-your-items.svg'
import classes from './Tutorial.module.scss'
import './_forSwiper.scss'
import Button from '../../components/Button'
import { setSeenTutorial } from '../../actions/seenTutorial'
import detectIos from '../../utils/detectIos'
import getWindowSize from '../../utils/getWindowSize'
import StyledRecycleSave from '../../components/Icons/StyledRecycleSave'

const slides = [
  {
    id: 0,
    heading: { id: 'Tutorial:Scan', defaultMessage: 'Scan your items' },
    text: {
      id: 'Tutorial:ScanText',
      defaultMessage:
        'Scan accepted products and packaging to save them in your recycling bin.',
    },
    image: <ScanYourItems />,
  },
  {
    id: 1,
    heading: { id: 'Tutorial:Drop', defaultMessage: 'Drop them off' },
    text: {
      id: 'Tutorial:DropText',
      defaultMessage:
        'Find your local Monoprix and drop off your scanned products and packaging at the dedicated recycling point.',
    },
    image: <DropThemOff />,
  },
  {
    id: 2,
    heading: { id: 'Tutorial:Rewards', defaultMessage: 'Get Rewards' },
    text: {
      id: 'Tutorial:RewardsText',
      defaultMessage: 'The more you recycle, the more rewards you will earn.',
    },
    image: <GetRewards />,
  },
]

export default function Tutorial() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const seenTutorial = useSelector((state) => state.seenTutorial)
  const [windowWidth, setWindowWidth] = useState(getWindowSize().innerWidth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!seenTutorial) dispatch(setSeenTutorial({ seenTutorial: true }))
    if (windowWidth > 1300) setCurrentSlide(2)

    function handleWindowResize() {
      setWindowWidth(getWindowSize().innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  function renderBtn() {
    if (currentSlide === 2 || currentSlide === -1) return <Proceed />
    return <SkipTutorial />
  }

  function renderTutorial() {
    if (windowWidth < 1300)
      return <TutorialCarousel setCurrentSlide={setCurrentSlide} />
    return <InlineTutorial />
  }

  return (
    <Page innerClassName={classes.historyPage}>
      <StyledRecycleSave className={classes.icon} />
      {renderTutorial()}
      <Link className={classes.link} to="/">
        {renderBtn()}
      </Link>
    </Page>
  )
}

function TutorialCarousel({ setCurrentSlide }) {
  const [isIos] = useState(detectIos())
  return (
    <Swiper
      pagination
      cssMode={isIos}
      modules={[Pagination]}
      className={classes.stepsContainer}
      onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
    >
      {slides.map(({ id, heading, text, image }) => (
        <SwiperSlide key={id} className={classes.step}>
          <h3 className={classes.stepTitle}>
            <FormattedMessage
              id={heading.id}
              defaultMessage={heading.defaultMessage}
            />
          </h3>
          <p className={classes.stepText}>
            <FormattedMessage
              id={text.id}
              defaultMessage={text.defaultMessage}
            />
          </p>
          {image}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

TutorialCarousel.propTypes = {
  setCurrentSlide: PropTypes.func,
}

function InlineTutorial() {
  return (
    <div className={classes.stepsContainer}>
      {slides.map(({ id, heading, text, image }) => (
        <div key={id} className={classes.step}>
          <h3 className={classes.stepTitle}>
            <FormattedMessage
              id={heading.id}
              defaultMessage={heading.defaultMessage}
            />
          </h3>
          <p className={classes.stepText}>
            <FormattedMessage
              id={text.id}
              defaultMessage={text.defaultMessage}
            />
          </p>
          {image}
        </div>
      ))}
    </div>
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
