import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
// import { isPast, isFuture } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
import FooterNav from '../../components/FooterNav'
import { Bubble, BubbleContainer } from '../../components/Bubble'
import StyledRecycleSave from '../../components/Icons/StyledRecycleSave'
import classes from './Home.module.scss'

import { ReactComponent as Box } from '../../assets/icons/box.svg'
import { ReactComponent as Recycling } from '../../assets/icons/recycling-symbol.svg'
import { ReactComponent as Discount } from '../../assets/icons/discount.svg'
import { ReactComponent as Close } from '../../assets/icons/green-cross.svg'
import detectDesktop from '../../utils/detectDesktop'
import { setAddToFavorites } from '../../actions/addToFavorites'

import http from '../../utils/http'
import useApiCall from '../../utils/useApiCall'
import { detectLanguage } from '../../utils/intl'

export default function Home() {
  const user = useSelector((state) => state.user)
  const [isDesktop] = useState(detectDesktop())
  const [showBanner, setShowBanner] = useState(true)
  // const [showNewCouponBanner, setShowNewCouponBanner] = useState(true)
  const [publicCoupons, setPublicCoupons] = useState([])
  const addToFavorites = useSelector((state) => state.addToFavorites)
  const [showAddToFavorites, setSowAddToFavorites] = useState(
    !addToFavorites?.seen,
  )

  const getContentApiCall = useApiCall()
  const navigate = useNavigate()
  useEffect(() => {
    const currentLang = user?.lang || detectLanguage()
    getContentApiCall(
      () => http.get(`/api/coupon/public-coupons?lang=${currentLang}`),
      (response) => {
        setPublicCoupons(changeCouponOrder(response.data))
      },
      null,
      null,
      { message: false },
    )

    setTimeout(() => {
      setSowAddToFavorites(false)
    }, 10000)
  }, [])

  function changeCouponOrder(coupons) {
    try {
      const uniqBrands = []
      const sortedByDiscount = coupons
        .sort((a, b) => b.discount - a.discount)
        .map((coupon) => ({ ...coupon, sorted: false }))
      sortedByDiscount.forEach((coupon) => {
        if (!uniqBrands.find((b) => b === coupon.brand))
          uniqBrands.push(coupon.brand)
      })

      const sorted = []

      uniqBrands.forEach((uB) => {
        /* eslint-disable-next-line */
        for (const coupon of sortedByDiscount) {
          if (coupon.brand === uB && coupon.sorted !== true) {
            sorted.push(coupon)
            coupon.sorted = true
            break
          }
        }
      })
      return [...sorted, ...sortedByDiscount.filter((c) => c.sorted === false)]
    } catch (e) {
      /* eslint-disable-next-line */
      console.error(e)
      return coupons
    }
  }

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
      {/* {isPast(new Date('Sep 20, 2023, 12:00:00 am')) && */}
      {/*  isFuture(new Date('Oct 10, 2023, 12:00:00 am')) && */}
      {/*  showNewCouponBanner && */}
      {/*  newCouponSystemBanner({ */}
      {/*    closeBanner: () => setShowNewCouponBanner(false), */}
      {/*  })} */}
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
        <div className={classes.headerContainer}>
          <StyledRecycleSave className={classes.logoHeaderContainer} />
          <Heading className={classes.styleHeading}>
            <FormattedMessage
              id="home:Title"
              defaultMessage="Recycle with us"
            />
          </Heading>
        </div>

        <BubbleContainer className={classes.bubbleContainer}>
          <p className={classes.howDoesItWork}>
            <FormattedMessage
              id="home:StepsHeader"
              defaultMessage="How does it work?"
            />
          </p>
          <Bubble className="py-0 home-bubble with-steps removeBoxShadow removeTextAlign">
            <div className="step-text-wrapper">
              <div className="step-text-wrapper-container">
                <div className={classes.step}>1</div>
                <p className="bubble-text my-text my-color-textPrimary">
                  <FormattedMessage
                    id="home:Bubble1"
                    defaultMessage="Individually scan and save used products in your virtual recycling bin"
                  />
                </p>
              </div>
              <Box className="bubble-icon with-steps bubbleHomeIcons" />
            </div>
          </Bubble>
          <Bubble className="py-0 home-bubble with-steps removeBoxShadow removeTextAlign">
            <div className="step-text-wrapper">
              <div className="step-text-wrapper-container">
                <div className={classes.step}>2</div>
                <p className="bubble-text my-text my-color-textPrimary">
                  <FormattedMessage
                    id="home:Bubble2"
                    defaultMessage="Recycle them at your local participating Monoprix store"
                  />
                </p>
              </div>
              <Recycling className="bubble-icon with-steps special-case" />
            </div>
          </Bubble>
          <Bubble className="py-0 home-bubble with-steps removeBoxShadow removeTextAlign">
            <div className="step-text-wrapper">
              <div className="step-text-wrapper-container">
                <div className={classes.step}>3</div>
                <p className="bubble-text my-text my-color-textPrimary">
                  <FormattedMessage
                    id="home:Bubble3"
                    defaultMessage="Get discount coupons in exchange for your recycled items"
                  />
                </p>
              </div>
              <Discount className="bubble-icon with-steps" />
            </div>
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

        <div className={classes.homeCouponCarousel}>
          <p className={classes.howDoesItWork}>
            <FormattedMessage
              id="home:CouponCarouselHeader"
              defaultMessage="Recycle more, earn more coupons"
            />
          </p>
          <div className={classes.homeCouponCarouselContainer}>
            {publicCoupons.map((coupon) => (
              <button
                type="button"
                key={`btn-${coupon?.id}`}
                onClick={() => {
                  navigate(
                    {
                      pathname: '/rewards-wallet/landing',
                    },
                    {
                      state: { ...coupon, backPath: '/' },
                    },
                  )
                }}
                className={classes.homeCouponCarouselItem}
              >
                <img
                  className={classes.homeCouponCarouselImages}
                  src={coupon.backgroundImage}
                  alt="Coupon"
                />
                <p className={classes.homeCouponCarouselUpToText}>Up to</p>
                <p className={classes.homeCouponCarouselDiscount}>
                  {coupon.discount}€
                </p>
              </button>
            ))}
          </div>
          <Link
            className="manual w-100"
            to="/rewards-wallet/rewards"
            data-testid="manual-setup"
          >
            <Button inverted>
              <FormattedMessage
                id="home:ViewCouponsButton"
                defaultMessage="View coupons"
              />
            </Button>
          </Link>
        </div>
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

// function newCouponSystemBanner({ closeBanner }) {
//   return (
//     <div className={classNames(classes.bannerWrap, classes.addToFavorites)}>
//       <h5 className={classNames(classes.bannerText, classes.addToFavorites)}>
//         <FormattedMessage
//           id="home:NewCouponBanner"
//           defaultMessage="Better value coupons back on 02/10!"
//         />
//       </h5>
//       <button
//         type="button"
//         onClick={closeBanner}
//         className={classes.closeBannerBtn}
//       >
//         <Close />
//       </button>
//     </div>
//   )
// }

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
