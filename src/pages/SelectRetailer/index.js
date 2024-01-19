import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import classes from './SelectRetailer.module.scss'
import { Swiper, SwiperSlide } from '../../utils/swiper'

import getWindowSize from '../../utils/getWindowSize'
import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import SwiperMenu from '../../components/SwiperMenu'
import WasteStream from '../../components/WasteStream'

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
        setRetailers(response.data)
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

  const filtered = retailers

  return (
    <Page width100 noSidePadding backgroundGrey className="with-animation">
      <SwiperMenu
        retailers={filtered.map((retailer, index) => ({
          id: retailer.id,
          name: retailer.name,
          index,
        }))}
        setActiveRetailer={setActiveRetailer}
        activeRetailer={activeRetailer}
        useIndex
      />
      <RetailerCarousel
        retailers={filtered}
        activeRetailer={activeRetailer}
        setActiveRetailer={setActiveRetailer}
        userRetailers={userRetailers}
      />
    </Page>
  )
}

export function RetailerCarousel({
  activeRetailer,
  setActiveRetailer,
  retailers,
  userRetailers,
}) {
  const swiperRef = useRef(null)
  const [windowWidth, setWindowWidth] = useState(getWindowSize().innerWidth)
  const [slidesShown, setSlidesShown] = useState(1.1)
  const [spaceBetween, setSpaceBetween] = useState(7)

  const [categories, setCategories] = useState([])
  const getCategoriesApiCall = useApiCall()

  useEffect(() => {
    getCategoriesApiCall(
      () => http.get('/api/category'),
      (response) => {
        setCategories(response.data)
      },
      null,
      null,
      { message: false },
    )
  }, [])

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
          to="/recycling-bin"
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
          <p
            className={classNames(
              classes.createNow,
              'my-text-description my-color-textPrimary',
            )}
          >
            <FormattedMessage
              id="SelectRetailer:CreateNow"
              defaultMessage="Dont have a Carrefour ID? <link>Create now</link>"
              values={{
                link: (chunks) => (
                  <Link className="my-color-main" to="/scan-or-type-carrefour">
                    {chunks}
                  </Link>
                ),
              }}
            />
          </p>
          <p className={classes.whatToRecycle}>
            <FormattedMessage
              id="SelectRetailer:WhatToRecycle"
              defaultMessage="What can you recycle"
            />
          </p>
          <WasteStream
            categories={categories?.filter(
              (category) => category.retailerId === id,
            )}
            enableLabels
          />
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
