import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
import FooterNav from '../../components/FooterNav'
import { Bubble, BubbleContainer, BubbleEnd } from '../../components/Bubble'
import StyledRecycleSave from '../../components/Icons/StyledRecycleSave'
import classes from './Home.module.scss'

import { ReactComponent as Box } from '../../assets/icons/box.svg'
import { ReactComponent as Recycling } from '../../assets/icons/recycling-symbol.svg'
import { ReactComponent as Discount } from '../../assets/icons/discount.svg'
import { ReactComponent as Arrow } from '../../assets/icons/arrow.svg'
import { ReactComponent as Close } from '../../assets/icons/green-cross.svg'
import detectDesktop from '../../utils/detectDesktop'
import { setAddToFavorites } from '../../actions/addToFavorites'
import bwipjs from 'bwip-js';

export default function Home() {
  const user = useSelector((state) => state.user)
  const [isDesktop] = useState(detectDesktop())
  const [showBanner, setShowBanner] = useState(true)
  const addToFavorites = useSelector((state) => state.addToFavorites)
  const [showAddToFavorites, setSowAddToFavorites] = useState(
    !addToFavorites?.seen,
  )

  useEffect(() => {

    // let canvas = bwipjs.toCanvas('mycanvas', {
    //   bcid:        'ean13',       // Barcode type
    //   text:        '2072013026092',    // Text to encode
    //   scale:       3,               // 3x scaling factor
    //   height:      15,              // Bar height, in millimeters
    //   includetext: true,            // Show human-readable text
    //   textxalign:  'center',        // Always good to set this
    // });
    //

    let canvas = bwipjs.toCanvas('mycanvas', {
      bcid:        'code128',       // Barcode type
      text:        '20720130278932222288070806872937031',    // Text to encode
      scale:       3,               // 3x scaling factor
      height:      15,              // Bar height, in millimeters
      includetext: true,            // Show human-readable text
      textxalign:  'center',        // Always good to set this
    });






    setTimeout(() => {
      setSowAddToFavorites(false)
    }, 10000)
  }, [])

  function getLink() {
    if (!user) return '/sign-in'
    return '/recycling-bin'
  }

  function renderBanner() {
    if (isDesktop && showBanner)
      return <DesktopBanner closeBanner={() => setShowBanner(false)} />
    return null
  }

  return (
    <div
      className={classNames(
        'w-100',
        'd-flex',
        'align-items-center',
        'flex-column',
        'my-bg-color-terraGrey',
        'hide-on-exit',
        classes.forHome,
        classes.homeContainer,
      )}
    >
      {renderBanner()}
      {showAddToFavorites && (
        <AddToFavoritesBanner closeBanner={() => setSowAddToFavorites(false)} />
      )}
      <div
        className={classNames(
          'w-100',
          'd-flex',
          'flex-column',
          'align-items-center',
          classes.wrapper,
        )}
      >
        <StyledRecycleSave />
        <Heading className={classes.styleHeading}>
          <FormattedMessage id="home:Title" defaultMessage="Recycle with us" />123
        </Heading>
        <BubbleContainer>
          <Bubble className="py-0 home-bubble with-steps">
            <div className="step-text-wrapper">
              <div className={classes.step}>123</div>
              <p className="bubble-text my-text my-color-textPrimary">
                <canvas id="mycanvas"></canvas>
                <FormattedMessage
                  id="home:Bubble1"
                  defaultMessage="Individually scan and save used products in your virtual recycling bin"
                />
              </p>
            </div>
            <Box className="bubble-icon with-steps" />
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className="py-0 home-bubble with-steps">
            <div className="step-text-wrapper">
              <div className={classes.step}>2</div>
              <p className="bubble-text my-text my-color-textPrimary">
                <FormattedMessage
                  id="home:Bubble2"
                  defaultMessage="Recycle them at your local participating Monoprix store"
                />
              </p>
            </div>
            <Recycling className="bubble-icon with-steps" />
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className="py-0 home-bubble with-steps">
            <div className="step-text-wrapper">
              <div className={classes.step}>3</div>
              <p className="bubble-text my-text my-color-textPrimary">
                <FormattedMessage
                  id="home:Bubble3"
                  defaultMessage="Get discount coupons in exchange for your recycled items"
                />
              </p>
            </div>
            <Discount className="bubble-icon with-steps" />
          </Bubble>
        </BubbleContainer>
        <Link to={getLink()} className="w-100 link-register">
          <Button>
            <FormattedMessage
              id="home:Submit"
              defaultMessage="Start recycling"
            />
          </Button>
        </Link>
      </div>
      <FooterNav />
    </div>
  )
}

function DesktopBanner({ closeBanner }) {
  return (
    <div className={classNames(classes.bannerWrap, classes.addToFavorites)}>
      <h5 className={classNames(classes.bannerText, classes.addToFavorites)}>
        <FormattedMessage
          id="home:Banner"
          defaultMessage="Please switch to mobile for a better experience!"
        />
      </h5>
      <button
        type="button"
        onClick={closeBanner}
        className={classes.closeBannerBtn}
      >
        <Close />
      </button>
    </div>
  )
}
DesktopBanner.propTypes = {
  closeBanner: PropTypes.func,
}

function AddToFavoritesBanner({ closeBanner }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAddToFavorites({ seen: true }))
  }, [])

  return (
    <div className={classNames(classes.bannerWrap, classes.addToFavorites)}>
      <h5 className={classNames(classes.bannerText, classes.addToFavorites)}>
        <FormattedMessage
          id="home:AddToFavorites"
          defaultMessage="Add to favorites"
        />
      </h5>
      <button
        type="button"
        onClick={closeBanner}
        className={classes.closeBannerBtn}
      >
        <Close />
      </button>
    </div>
  )
}
AddToFavoritesBanner.propTypes = {
  closeBanner: PropTypes.func,
}
