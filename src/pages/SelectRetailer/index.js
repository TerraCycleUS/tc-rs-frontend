import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import RetailerMenu from '../../components/RetailerMenu'
import detectIos from '../../utils/detectIos'
import classes from './SelectRetailer.module.scss'
import { Swiper, SwiperSlide } from './swiper'

import MakeupSkincareIcon from '../../assets/icons/makeup-&-skincare.svg'
import OralCareIcon from '../../assets/icons/oral-care.svg'
import GroomingIcon from '../../assets/icons/grooming.svg'
import HairCareIcon from '../../assets/icons/hair-care.svg'
import DeodorantsIcon from '../../assets/icons/deoderants.svg'
import ShowerBathSoapIcon from '../../assets/icons/shower-bath-soap.svg'
import getWindowSize from '../../utils/getWindowSize'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'

export default function SelectRetailer() {
  const [activeRetailer, setActiveRetailer] = useState(-1)
  const [retailers, setRetailers] = useState([])
  const getRetailersApiCall = useApiCall()

  useEffect(() => {
    getRetailersApiCall(
      () => http.get('/api/retailer'),
      (response) => {
        const sortedRetailers = response.data.sort((a, b) => a.id - b.id)
        setRetailers(sortedRetailers)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  return (
    <Page width100 noSidePadding backgroundGrey className="with-animation">
      <RetailerMenu
        retailers={retailers.map((retailer) => ({
          id: retailer.id,
          name: retailer.name,
        }))}
        setActiveRetailer={setActiveRetailer}
        activeRetailer={activeRetailer}
      />
      <RetailerCarousel
        retailers={retailers}
        activeRetailer={activeRetailer}
        setActiveRetailer={setActiveRetailer}
      />
    </Page>
  )
}

function RecyclableCategories() {
  const categories = [
    {
      id: 0,
      iconSrc: MakeupSkincareIcon,
      text: {
        id: 'selectRetailer:MakeupSkincare',
        defaultMessage: 'Makeup & Skincare',
      },
    },
    {
      id: 1,
      iconSrc: OralCareIcon,
      text: { id: 'selectRetailer:OralCare', defaultMessage: 'Oral Care' },
    },
    {
      id: 2,
      iconSrc: GroomingIcon,
      text: { id: 'selectRetailer:Grooming', defaultMessage: 'Grooming' },
    },
    {
      id: 3,
      iconSrc: HairCareIcon,
      text: { id: 'selectRetailer:HairCare', defaultMessage: 'Hair Care' },
    },
    {
      id: 4,
      iconSrc: DeodorantsIcon,
      text: { id: 'selectRetailer:Deodorants', defaultMessage: 'Deodorants' },
    },
    {
      id: 5,
      iconSrc: ShowerBathSoapIcon,
      text: {
        id: 'selectRetailer:ShowerBathSoap',
        defaultMessage: 'Shower, Bath & Hand hygiene',
      },
    },
  ]

  return (
    <div className={classes.categoryWrapper}>
      {categories.map(({ id, iconSrc, text }) => (
        <div key={id} className={classes.category}>
          <img src={iconSrc} alt="category" className={classes.categoryIcon} />
          <p className={classes.categoryText}>
            <FormattedMessage
              id={text.id}
              defaultMessage={text.defaultMessage}
            />
          </p>
        </div>
      ))}
    </div>
  )
}

export function RetailerCarousel({
  activeRetailer,
  setActiveRetailer,
  retailers,
}) {
  const [isIos] = useState(detectIos())
  const swiperRef = useRef(null)
  const [windowWidth, setWindowWidth] = useState(getWindowSize().innerWidth)
  const [slidesShown, setSlidesShown] = useState(1.1)
  const [spaceBetween, setSpaceBetween] = useState(7)

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current?.swiper.slideTo(activeRetailer - 1)
    }

    if (windowWidth > 1700) {
      setSlidesShown(4)
      setSpaceBetween(40)
    } else if (windowWidth > 1300) {
      setSlidesShown(3)
      setSpaceBetween(40)
    } else if (windowWidth > 991) {
      setSlidesShown(2)
      setSpaceBetween(30)
    } else if (windowWidth > 750) {
      setSlidesShown(1.8)
      setSpaceBetween(20)
    } else if (windowWidth > 560) {
      setSlidesShown(1.5)
      setSpaceBetween(15)
    } else {
      setSlidesShown(1.1)
      setSpaceBetween(7)
    }

    function handleWindowResize() {
      setWindowWidth(getWindowSize().innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [activeRetailer, windowWidth])

  return (
    <Swiper
      spaceBetween={spaceBetween}
      onSlideChange={(swiper) => setActiveRetailer(swiper.activeIndex + 1)}
      cssMode={isIos}
      className={classes.carouselContainer}
      centeredSlides
      slidesPerView={slidesShown}
      ref={swiperRef}
    >
      {retailers.map(({ id, name, logo, backgroundImage, description }) => (
        <SwiperSlide key={id} className={classes.carouselItem}>
          <div className={classes.brandContainer}>
            <p className={classes.brandName}>{name}</p>
            <img className={classes.brandIcon} src={logo} alt="brand-icon" />
          </div>
          <img className={classes.shopPhoto} src={backgroundImage} alt="shop" />
          <p
            className={classes.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className={classes.whatToRecycle}>
            <FormattedMessage
              id="SelectRetailer:WhatToRecycle"
              defaultMessage="What can you recycle"
            />
          </p>
          <RecyclableCategories />
          <Link
            className={classes.registerLink}
            to="../retailers-id"
            data-testid="retailers-id"
            state={{ retailer: id }}
          >
            <Button>
              <FormattedMessage
                id="SelectRetailer:Register"
                defaultMessage="Register"
              />
            </Button>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
RetailerCarousel.propTypes = {
  retailers: PropTypes.array,
  activeRetailer: PropTypes.number,
  setActiveRetailer: PropTypes.func,
}
