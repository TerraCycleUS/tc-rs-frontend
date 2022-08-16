import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-relative-packages
import '../../../node_modules/swiper/swiper-bundle.min.css'
import { Pagination } from 'swiper'
import Page from '../../Layouts/Page'
import { ReactComponent as RecycleSave } from '../../assets/icons/recycle-save.svg'
import { ReactComponent as GetRewards } from '../../assets/images/get-rewards.svg'
import { ReactComponent as DropThemOff } from '../../assets/images/drop-them-off.svg'
import { ReactComponent as ScanYourItems } from '../../assets/images/scan-your-items.svg'
import classes from './Tutorial.module.scss'
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css'
import './_forSplide.scss'
import './_forSwiper.scss'
import Button from '../../components/Button'
import { setSeenTutorial } from '../../actions/seenTutorial'
import detectIos from '../../utils/detectIos'

const slides=[
  {
    id: 0,
    heading: { id: 'Tutorial:Scan', defaultMessage: 'Scan your items' },
    text: { id: 'Tutorial:ScanText', defaultMessage: 'Scan accepted products and packaging to save them in your recycling bin.' },
    image: <ScanYourItems />,
  },
  {
    id: 1,
    heading: { id: 'Tutorial:Drop', defaultMessage: 'Drop them off' },
    text: { id: 'Tutorial:DropText', defaultMessage: 'Find your local Monoprix and drop off your scanned products and packaging at the dedicated recycling point.' },
    image: <DropThemOff />,
  },
  {
    id: 2,
    heading: { id: 'Tutorial:Rewards', defaultMessage: 'Get Rewards' },
    text: { id: 'Tutorial:RewardsText', defaultMessage: 'The more you recycle, the more rewards you will earn.' },
    image: <GetRewards />,
  },
]

export default function Tutorial() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isIos, setIsIos] = useState(false)
  const seenTutorial = useSelector((state) => state.seenTutorial)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!seenTutorial) dispatch(setSeenTutorial({ seenTutorial: true }))
    setIsIos(detectIos())
  }, [])

  function renderBtn() {
    if (currentSlide === 2 || currentSlide === -1) return <Proceed />
    return <SkipTutorial />
  }

  return (
    <Page innerClassName={classes.historyPage}>
      <RecycleSave className={classes.icon} />
      {/* <Splide */}
      {/*  onMoved={(splide, newIndex) => { */}
      {/*    setCurrentSlide(newIndex) */}
      {/*  }} */}
      {/*  onDestroy={() => { */}
      {/*    setCurrentSlide(-1) */}
      {/*  }} */}
      {/*  options={{ */}
      {/*    type: 'slide', */}
      {/*    rewind: true, */}
      {/*    arrows: false, */}
      {/*    destroy: true, */}
      {/*    pagination: false, */}
      {/*    breakpoints: { */}
      {/*      1300: { */}
      {/*        gap: 0, */}
      {/*        destroy: false, */}
      {/*        perPage: 1, */}
      {/*        pagination: true, */}
      {/*      }, */}
      {/*    }, */}
      {/*  }} */}
      {/*  className={classes.stepsContainer} */}
      {/* > */}
      {/*  <SplideSlide className={classes.step}> */}
      {/*    <h3 className={classes.stepTitle}> */}
      {/*      <FormattedMessage */}
      {/*        id="Tutorial:Scan" */}
      {/*        defaultMessage="Scan your items" */}
      {/*      /> */}
      {/*    </h3> */}
      {/*    <p className={classes.stepText}> */}
      {/*      <FormattedMessage */}
      {/*        id="Tutorial:ScanText" */}
      {/*        defaultMessage="Scan accepted products and packaging to save them in your recycling bin." */}
      {/*      /> */}
      {/*    </p> */}
      {/*    <ScanYourItems /> */}
      {/*  </SplideSlide> */}
      {/*  <SplideSlide className={classes.step}> */}
      {/*    <h3 className={classes.stepTitle}> */}
      {/*      <FormattedMessage */}
      {/*        id="Tutorial:Drop" */}
      {/*        defaultMessage="Drop them off" */}
      {/*      /> */}
      {/*    </h3> */}
      {/*    <p className={classes.stepText}> */}
      {/*      <FormattedMessage */}
      {/*        id="Tutorial:DropText" */}
      {/*        defaultMessage="Find your local Monoprix and drop off your scanned products and packaging at the dedicated recycling point." */}
      {/*      /> */}
      {/*    </p> */}
      {/*    <DropThemOff /> */}
      {/*  </SplideSlide> */}
      {/*  <SplideSlide className={classes.step}> */}
      {/*    <h3 className={classes.stepTitle}> */}
      {/*      <FormattedMessage */}
      {/*        id="Tutorial:Rewards" */}
      {/*        defaultMessage="Get Rewards" */}
      {/*      /> */}
      {/*    </h3> */}
      {/*    <p className={classes.stepText}> */}
      {/*      <FormattedMessage */}
      {/*        id="Tutorial:RewardsText" */}
      {/*        defaultMessage="The more you recycle, the more rewards you will earn." */}
      {/*      /> */}
      {/*    </p> */}
      {/*    <GetRewards /> */}
      {/*  </SplideSlide> */}
      {/* </Splide> */}

      <Swiper
        pagination
        cssMode={isIos}
        modules={[Pagination]}
        className={classes.stepsContainer}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          1300: {
            scrollEnabled: false,
          },
        }}
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

      <Link replace reloadDocument className={classes.link} to="/">
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
