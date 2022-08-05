import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

export default function Home() {
  const user = useSelector((state) => state.user)
  function getLink() {
    if (!user) return '/sign-in'
    return '/recycling-bin'
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
                defaultMessage="Scan and save products in your virtual recycling bin"
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
                defaultMessage="Recycle them at your local Monoprix store"
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
