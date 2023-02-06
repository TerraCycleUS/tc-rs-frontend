import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import detectIos from '../../utils/detectIos'
import classes from './SelectRetailer.module.scss'
import { Swiper, SwiperSlide } from '../../utils/swiper'

import MakeupSkincareIcon from '../../assets/icons/makeup-&-skincare.svg'
import OralCareIcon from '../../assets/icons/oral-care.svg'
import GroomingIcon from '../../assets/icons/grooming.svg'
import HairCareIcon from '../../assets/icons/hair-care.svg'
import DeodorantsIcon from '../../assets/icons/deoderants.svg'
import ShowerBathSoapIcon from '../../assets/icons/shower-bath-soap.svg'
import getWindowSize from '../../utils/getWindowSize'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import SwiperMenu from '../../components/SwiperMenu'
import { CARREFOUR_ID } from '../../utils/const'

export default function SelectRetailer() {
  const [activeRetailer, setActiveRetailer] = useState(0)
  const [retailers, setRetailers] = useState([])
  const [userRetailers, setUserRetailers] = useState([])
  const getRetailersApiCall = useApiCall()
  const location = useLocation()
  const retailerId = location?.state?.retailer

  useEffect(() => {
    getRetailersApiCall(
      () => http.get('/api/retailer'),
      (response) => {
        setRetailers(
          response.data?.map((retailer, index) => ({ ...retailer, index })),
        )
      },
      null,
      null,
      { message: false },
    )
  }, [])

  useEffect(() => {
    getRetailersApiCall(
      () => http.get('/api/retailer/my-retailers'),
      (response) => {
        setUserRetailers(response.data)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  useEffect(() => {
    if (retailerId && retailers) {
      setActiveRetailer(
        retailers.find((retailer) => retailer.id === retailerId)?.index,
      )
    }
  }, [retailers])

  return (
    <Page width100 noSidePadding backgroundGrey className="with-animation">
      <SwiperMenu
        retailers={retailers.map((retailer) => ({
          id: retailer.id,
          name: retailer.name,
          index: retailer.index,
        }))}
        setActiveRetailer={setActiveRetailer}
        activeRetailer={activeRetailer}
        useIndex
      />
      <RetailerCarousel
        retailers={retailers}
        activeRetailer={activeRetailer}
        setActiveRetailer={setActiveRetailer}
        userRetailers={userRetailers}
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
  userRetailers,
}) {
  const [isIos] = useState(detectIos())
  const swiperRef = useRef(null)
  const [windowWidth, setWindowWidth] = useState(getWindowSize().innerWidth)
  const [slidesShown, setSlidesShown] = useState(1.1)
  const [spaceBetween, setSpaceBetween] = useState(7)

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current?.swiper.slideTo(activeRetailer)
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

  function editOrRegister(id, name) {
    const alreadyHaveThis = userRetailers?.some(
      (retailer) => retailer.id === id,
    )
    const thisRetailer = userRetailers?.find((retailer) => retailer.id === id)

    if (!alreadyHaveThis)
      return (
        <Link
          className={classes.registerLink}
          to={
            id === CARREFOUR_ID ? '/scan-or-type-carrefour' : '../retailers-id'
          }
          data-testid="retailers-id"
          state={{ retailer: id, name }}
        >
          <Button>
            <FormattedMessage
              id="SelectRetailer:Register"
              defaultMessage="Register"
            />
          </Button>
        </Link>
      )
    return (
      <Link
        className={classes.registerLink}
        to="/profile/retailer-id-edit"
        data-testid="retailers-id"
        state={{
          userLoyaltyCode: thisRetailer?.userLoyaltyCode,
          userLoyaltyPassCode: thisRetailer?.userLoyaltyPassCode,
          retailer: id,
          name,
        }}
      >
        <Button>
          <FormattedMessage id="SelectRetailer:Edit" defaultMessage="Edit" />
        </Button>
      </Link>
    )
  }

  return (
    <Swiper
      spaceBetween={spaceBetween}
      onSlideChange={(swiper) => setActiveRetailer(swiper.activeIndex)}
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
          {editOrRegister(id, name)}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
RetailerCarousel.propTypes = {
  retailers: PropTypes.array,
  activeRetailer: PropTypes.number,
  setActiveRetailer: PropTypes.func,
  userRetailers: PropTypes.array,
}
