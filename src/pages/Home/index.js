import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

export default function Home() {
  const user = useSelector((state) => state.user)
  const [isDesktop] = useState(detectDesktop())
  const [showBanner, setShowBanner] = useState(true)

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
          <FormattedMessage
            id="home:Title"
            defaultMessage="Recycle with Monoprix"
          />
        </Heading>
        <BubbleContainer>
          <Bubble className="py-0">
            <Box className="bubble-icon" />
            <p className="bubble-text my-text my-color-textPrimary">
              <FormattedMessage
                id="home:Bubble1"
                defaultMessage="Individually scan and save used products in your virtual recycling bin"
              />
            </p>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className="py-0">
            <Recycling className="bubble-icon" />
            <p className="bubble-text my-text my-color-textPrimary">
              <FormattedMessage
                id="home:Bubble2"
                defaultMessage="Recycle them at your local participating Monoprix store"
              />
            </p>
            <BubbleEnd />
            <Arrow className="arrow" />
          </Bubble>
          <Bubble className="py-0">
            <Discount className="bubble-icon" />
            <p className="bubble-text my-text my-color-textPrimary">
              <FormattedMessage
                id="home:Bubble3"
                defaultMessage="Get discount coupons in exchange for your recycled items"
              />
            </p>
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
    <div className={classes.bannerWrap}>
      <h5 className={classes.bannerText}>
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
