import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, { Pagination } from 'swiper'
import Page from '../../Layouts/Page'
import { ReactComponent as RecycleSave } from '../../assets/icons/recycle-save.svg'
import { ReactComponent as GetRewards } from '../../assets/images/get-rewards.svg'
import { ReactComponent as DropThemOff } from '../../assets/images/drop-them-off.svg'
import { ReactComponent as ScanYourItems } from '../../assets/images/scan-your-items.svg'
import classes from './Tutorial.module.scss'

// import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/effect-coverflow/effect-coverflow.scss'


// configure Swiper to use modules
SwiperCore.use([Pagination])


import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export default function Tutorial() {
  const [currentSlide, setCurrentSlide] = useState(0)
  console.log(currentSlide)
  return (
    <Page>
      <RecycleSave className={classes.icon} />

      {/*swiper*/}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor="true"
        centeredSlides="true"
        className={classes.stepsContainer}
        pagination={{ clickable: true }}
        onSlideChange={(info) => setCurrentSlide(info.activeIndex)}
      >
        <SwiperSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Scan your items</h3>
          <p className={classes.stepText}>
            Scan accepted products and packaging to save them in your recycling
            bin.
          </p>
          <ScanYourItems />
        </SwiperSlide>
        <SwiperSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Drop them off</h3>
          <p className={classes.stepText}>
            Find your local Monoprix and drop off your scanned products and
            packaging at the dedicated recycling point.
          </p>
          <DropThemOff />
        </SwiperSlide>
        <SwiperSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Get Rewards</h3>
          <p className={classes.stepText}>
            The more you recycle, the more rewards you will earn.
          </p>
          <GetRewards />
        </SwiperSlide>
      </Swiper>

      {/*splide*/}
      <Splide
        options={{
          type: 'slide',
          rewind: true,
        }}
        className={classes.stepsContainer}
      >
        <SplideSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Scan your items</h3>
          <p className={classes.stepText}>
            Scan accepted products and packaging to save them in your recycling
            bin.
          </p>
          <ScanYourItems />
        </SplideSlide>
        <SplideSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Drop them off</h3>
          <p className={classes.stepText}>
            Find your local Monoprix and drop off your scanned products and
            packaging at the dedicated recycling point.
          </p>
          <DropThemOff />
        </SplideSlide>
        <SplideSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Get Rewards</h3>
          <p className={classes.stepText}>
            The more you recycle, the more rewards you will earn.
          </p>
          <GetRewards />
        </SplideSlide>
      </Splide>

      {/*slick*/}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor="true"
        centeredSlides="true"
        className={classes.stepsContainer}
        pagination={{ clickable: true }}
        onSlideChange={(info) => setCurrentSlide(info.activeIndex)}
      >
        <SwiperSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Scan your items</h3>
          <p className={classes.stepText}>
            Scan accepted products and packaging to save them in your recycling
            bin.
          </p>
          <ScanYourItems />
        </SwiperSlide>
        <SwiperSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Drop them off</h3>
          <p className={classes.stepText}>
            Find your local Monoprix and drop off your scanned products and
            packaging at the dedicated recycling point.
          </p>
          <DropThemOff />
        </SwiperSlide>
        <SwiperSlide className={classes.step}>
          <h3 className={classes.stepTitle}>Get Rewards</h3>
          <p className={classes.stepText}>
            The more you recycle, the more rewards you will earn.
          </p>
          <GetRewards />
        </SwiperSlide>
      </Swiper>
    </Page>
  )
}
